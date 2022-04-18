/* const jwt = require('jsonwebtoken');
const config = require('../configs/config');

const checkAdmin = (req) => {
    const token = (req.headers.cookie).substring(13, 194);
    const decoded = jwt.verify(token, config.llave)
   
    return decoded
}

module.exports = checkAdmin;
 */

const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../models/userAPIModel');
const config = require('../configs/config');

const checkAdmin = express.Router();

checkAdmin.use(async (req, res, next) => {
    const token = (req.headers.cookie).slice(13);
    const users = await db.getUsers();
    const decoded = jwt.verify(token, config.llave);
    const user = users.find(u => { return u.email ===  decoded.email});
    
    if(user.admin){
        next()
    } else if (user.admin == false){
        return res.status(401).send({
            message: "Unauthorized!"
        });
    } else {
        res.sendStatus(401);
    } 
});

module.exports = checkAdmin;