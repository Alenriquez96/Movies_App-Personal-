const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const regex = require('../utils/regex');
const jwt_secret = process.env.ULTRA_SECRET_KEY;
const config = require('../configs/config');
const express = require('express');
const db = require('../models/userAPIModel');
const transporter = require('../configs/nodemailer'); 
const pool = require('../utils/dbconfig-pg.js');
const auth = require("../configs/auth");
const passport = require('passport');
const googlePassport = require("../configs/auth");
const { v4: uuidv4 } = require('uuid');


const onLoad = (req, res) => {
    res.render("auth/home");
}

const getLogin = (req, res) => {
    res.render("auth/login");
}

const getSignUp = (req, res) => {
    res.render("auth/signup");
}

const loginUser = async (req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;

    if (!email) return res.status(200).send({ success: false, error: "email not provided" });
    if (!pass) return res.status(200).send({ success: false, error: "password not provided" });
    try {
        const users = await db.getUsers();
        const user = users.find(u => { return u.email === email });
        if (user) {
            const match = await bcrypt.compare(pass, user.password);
            if (match && user.admin == false) {
                const payload = {
                    email: user.email,
                    check: true
                };
                //console.log(payload);
                const token = jwt.sign(payload, config.llave, {
                    expiresIn: "20m"
                });
                res.cookie("access-token", token, {
                    httpOnly: true,
                    sameSite: "strict",
                }).redirect(`${process.env.URL_BASE}/dashboard`);
            }
            else if (match && user.admin == true) {
                const payload = {
                    email: user.email,
                    check: true
                };
                const token = jwt.sign(payload, config.llave, {
                    expiresIn: "20m"
                });
                res.cookie("access-token", token, {
                    httpOnly: true,
                    sameSite: "strict",
                }).redirect(`${process.env.URL_BASE}/movies`);
            }
            else {
                res.send('Email or password incorrect');
            }
        } else {
            res.send('Email or password incorrect');
        }
    }
    catch (error) {
        console.log('Error:', error);
    }
};

const signUpUser = async (req, res) => {
    try {
        const newUser = req.body; // {} nuevo user a guardar
        const response = await db.signUpUser(newUser, res);
        res.status(201).redirect(`${process.env.URL_BASE}/login`);
    } catch (error) {
        console.log('Error:', error);
    }
}

const recoverPassView = (req, res) => {
    ////Esta es de las vistas/////////
    res.render("auth/recoverPass")
}

const recoverPass = async (req, res) => {
    try {
        const recoverToken = jwt.sign({ email: req.body.email }, config.llaveRecover, { expiresIn: '10m' });
        const url = `${process.env.URL_BASE}/restorepassword/` + recoverToken;
        await transporter.sendMail({
            to: req.body.email,
            subject: 'Recover Password',
            html: `<h3>Recover Password</h3>
                <a href = ${url}>Click to recover password</a>
                <p>Link will expire in 10 minutes</p>`
        });
        res.render("auth/emailsent")
    } catch (error) {
        console.log('Error:', error)
    }
}



const restorePassView = (req, res) => {
    res.render("auth/restorePass")
}

const restorePass = async (req, res) => {

    try {
        let client;
        const users = await db.getUsers();
        const recoverToken = req.params.recoverToken;
        const payload = jwt.verify(recoverToken, config.llaveRecover);
        const pass = req.body.pass1
        const pass2 = req.body.pass2
        const user = users.find(u => { return payload.email === u.email });
        if (user) {
            if (regex.validatePassword(pass) && pass == pass2) {
                client = await pool.connect();
                const hashPassword = await bcrypt.hash(pass, 10);
                await client.query(
                    `UPDATE users
                    SET password = ($1)
                    WHERE email = ($2)`, [hashPassword, payload.email]);
                res.status(200).redirect(`${process.env.URL_BASE}/login`);
            }
            else if (pass != pass2) {
                res.send("Passwords dont match");
            }
            else {
                res.status(400).json({ msg: 'Password must have at least 8 characters, one uppercase, one lowercase and one special character' });
            }
        }
        else {
            res.send("No se encontró ninguna dirección de email")
        }
    } catch (error) {
        console.log('Error:', error);
    }
}


const logoutUser = async (req, res) => {
    // req.logout();
    res.clearCookie("access-token").redirect(`/`)
}

//-------------------------Esta función loguea los usuarios de la bbdd en la terminal(Descomentar para loguear)--------------//
// const users = (async(req,res)=>{
//     const u = await db.getUsers();
//     console.log(u);        

const googleAuth = passport.authenticate("google", { scope: ['email', 'profile'], prompt: "select_account" });
const googleCallBack = passport.authenticate('google', { failureRedirect: '/auth/failure' });
const googleToken = async (req,res)=>{
    const users = await db.getUsers();
    const user = users.find(u => { return req.user.emails[0].value === u.email });
    if (user) {
        const name = req.user.name.givenName;
        const img = req.user.photos[0].value;
        
        const payload = {
            email: user.email,
            check: true
        };
        const token = jwt.sign(payload, config.llave, {
            expiresIn: "20m"
        });
        res.cookie("access-token", token, {
            httpOnly: true,
            sameSite: "strict",
        }).render("auth/welcomeGoogle",{name:name, img:img});
    }
    else {
        const passRandom = "A$"+uuidv4();
        const newUser = { 
            name: req.user.name.givenName, 
            surname: req.user.name.familyName || "googleIncognito", 
            email: req.user.emails[0].value,
            pass: passRandom,
            pass2: passRandom    
        }; 
        await db.signUpUser(newUser);
        const payload = {
            email: newUser.email,
            check: true
        };
        const token = jwt.sign(payload, config.llave, {
            expiresIn: "20m"
        });
        res.cookie("access-token", token, {
            httpOnly: true,
            sameSite: "strict",
        }).status(201).render("auth/welcomeGoogle");
    }
}



const user = {
    onLoad,
    getLogin,
    getSignUp,
    loginUser,
    signUpUser,
    recoverPassView,
    recoverPass,
    restorePassView,
    restorePass,
    logoutUser,

    googleAuth,
    googleCallBack,
    googleToken
}

module.exports = user;