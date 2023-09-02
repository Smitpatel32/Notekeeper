require("dotenv").config()
const express = require("express");
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const JWT_STRING = "Satuupatuu"
const fetchToken = require("../middleware/login");
const Token = require("../models/Token")
const sendEmail = require("./sendEmail")

// .......................Create User...............................
router.post("/create-user", [
    body('name', "Enter a valid Name").trim().notEmpty(),
    body('email', "Enter a valid Email").trim().notEmpty().isEmail(),
    body('password', "Enter a valid Password (length must be 5 or more character)").trim().notEmpty().isByteLength({ min: 5 }),
    body('mobile', "Enter a valid Phone Number").trim().notEmpty().isByteLength({ min:10}),
    body('college', "Enter a valid Name").trim()
], async (req, res) => {
    let success= false
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.send({success, errors: result.array() });
    }
    else {
        try {

// Comparing if same email exists or not
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({success, errors: "User with email already exists" });
            }
// encrypt password
            const salt = await bcrypt.genSalt(10)
            let securedPass = await bcrypt.hash(req.body.password,salt);

// if same email doesn't exists create a new user and add to db
               user = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: securedPass,
                    mobileNo:req.body.mobile,
                    college:req.body.college.trim().toLowerCase().split(" ").join("")               })

// creating token.
                const data = {
                    user: {
                        id: user.id
                    }
                } 

                const authToken = jwt.sign(data,JWT_STRING);
                let token = await Token.create({
                    userId : user.id,
                    token : authToken
                })
// sending email 
                const url = `${process.env.BASE_URL}api/auth/${user._id}/verify/${token.token}`
                await sendEmail(user.email,"verify Email",url)
                success = true
                res.json({success,authToken,message:"An Email sent to your account Verify it."})

        } catch (error) {
            console.log(error)
            res.status(500).json({success,errors:"some error occured"})
        }
    }
})



// .......................Login authentication...............................
router.post("/login", [
    body('email', "Enter a valid Email").trim().notEmpty().isEmail(),
    body('password', "Enter a valid Password").trim().notEmpty().isByteLength({ min: 5 })
], async (req, res) => {

    let success = false
    let authToken;
// validate password/email formate;
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.send({success,errors: result.array() });
    }
    else{
        const {email,password} = req.body
        try {
// Comparing if same email exists or not
            let user = await User.findOne({email});
            if (!user) {
                return res.status(400).json({success, errors: "Please enter Correct email/password" });
            }
            else{
                const compPass = await bcrypt.compare(password,user.password);
                if(!compPass){
                    return res.status(400).json({success, errors: "Please enter Correct Password" });
                }
                else{
// sending email verification to not verified users 
                    if(!(user.verified)){
                        let token = await Token.findOne({userId:user.id});
                        let payload = {
                            user: {
                                id: user.id
                            }
                        }
                        authToken = jwt.sign(payload,JWT_STRING);
                        if(!token){
                            token = await Token.create({
                                userId :user.id,
                                token : authToken
                            })
                        }
                            const url = `${process.env.BASE_URL}api/auth/${user._id}/verify/${token.token}`
                            await sendEmail(user.email,"Confirmation Email",url)
                            success = true
                            res.json({success,authToken,message:"An Email sent to your account Verify it."})
                }
                    else{
                        let payload = {
                            user: {
                                id: user.id
                            }
                        }
                        authToken = jwt.sign(payload,JWT_STRING);
                        success = true
                        res.json({success,authToken,message:""})
                    }
            }
        }
        } catch (errors) {
            success = false
            console.log(errors)
            res.status(500).json({success,errors:"internal server error."})
        }
    }
})


// ....................... Verify Email ...............................
router.get("/:id/verify/:token",async(req, res) => {
    try{
        const user = await User.findById(req.params.id)
        if(!user){
            res.status(400).json({error:"Invalid Link"})
        }
        const token = await Token.findOne({
            userId : user.id,
            token : req.params.token
        })
        if(!token){
            res.status(400).json({error:"Invalid Link"})
        }
// verifying and redirecting to login page.
        await User.findByIdAndUpdate(user._id,{verified:true},{new:true})
        await Token.deleteOne(token)
        res.redirect(`http://localhost:3000/auth/${req.params.id}/verify/${req.params.token}`);
    }catch (error) {
        console.error(error.message)
        res.status(500).json({error:"internal server error."})
    }
})

module.exports = router