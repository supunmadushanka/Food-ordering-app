const jwt = require('jsonwebtoken');
require('dotenv').config();
var SECRET_KEY = "supun";

module.exports = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1];
    if(token === 'null') {
        return res.status(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token, SECRET_KEY);
    if(!payload) {
        return res.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject;
    next();
}