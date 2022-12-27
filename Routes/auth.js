const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET_KEY

//ROUTE 1: create a user using: POST "/api/auth/createuser"[No login required]
router.post("/createuser",[
    body('name', 'please enter a name').isLength({min:3}),
    body('password', 'please chose a long password').isLength({min:5}),
    body('email', 'enter a valid email').isEmail()
],async(req, res) => {  
    let success = false;
    //error checking
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //check if Email is unique or not
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({success, error: "This email already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt)
        // create a new user
        user = await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
        });
        const data = {
            user:{
                id: user.id
            }
        }
        success = true;
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({success, authtoken})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})


//ROUTE 2: Authinticate a user: POST "/api/auth/login"[No login required]
router.post('/login',[
    body('password', 'password can not be blank').exists(),
    body('email', 'enter a valid email').isEmail()
],async(req,res)=>{
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const{email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            console.log("user nahi hai");
            return res.status(400).json({error: "email does not exists"})
        }

        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({success, error: "Please try to login with correct credintials"})
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        success = true
        const authtoken = jwt.sign(payload, JWT_SECRET);
        res.json({success, authtoken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }
})

// ROUTE 3: Get user details using POST "/api/auth/getuser" [Login Required]
router.post('/getuser',fetchuser,async(req,res)=>{
    try {
        const userID =  req.user.id;
        const user = await User.findById(userID).select("-password");
        res.send({user});
    } catch (error) { 
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }
})

module.exports = router