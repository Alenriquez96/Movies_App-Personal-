const express = require('express');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.ULTRA_SECRET_KEY;
const config = require('../configs/config');

const protectedRoutes = express.Router();

protectedRoutes.use((req, res, next) => {
  const cookies = req.headers.cookie;
  console.log(cookies);
  if (cookies) {
    const cookieArray = cookies.split("=");
    const token = cookieArray[1];

      jwt.verify(token, config.llave, (err, user) => {
          if (err) {
              return res.status(401).send({
                message: "Unauthorized!"
              });
          }
          req.user = user;
          next();
      });
  } else {
      res.sendStatus(401);
  }
});

module.exports = protectedRoutes;