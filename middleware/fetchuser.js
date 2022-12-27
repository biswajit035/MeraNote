var jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET_KEY
// "Haldia"

const fetchuser = (req, res, next)=>{
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token'); 
    if(!token){
        res.status(401).send({error: "Please authinticate using a valid token"})
    }
    try {
    const string = jwt.verify(token, JWT_SECRET);
    req.user = string.user; 
    next()
    } catch (error) {
        res.status(401).send({error: "please authenticate using a valid token"})
    }
}

module.exports = fetchuser;