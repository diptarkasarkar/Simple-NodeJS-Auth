const User = require('../models/models')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register controller
const registerUser = async (req,res) => {
    try {
        //extract user info from req body
        const {username, email, password, role} = req.body;

        //check if the user alredy exists
        const checkExistingUser =  await User.findOne({$or : [{username}, {email}]});
        if(checkExistingUser){
            res.status(400).json({
                success: false,
                message: "A user already exists with that username/email. Please try again with different username/email"
            })
        }

        //hash user password

        const salt = await bcrypt.genSalt(10);
        const hasedPassword = await bcrypt.hash(password,salt);

        //creating a new user and saving in database

        const newlyCreatedUser = new User({
            username,
            email,
            password : hasedPassword,
            role : role || 'user'
        })

        await newlyCreatedUser.save();
        if(newlyCreatedUser){
            res.status(201).json({
                success: true,
                message: 'user registration is successfull'
            });
        } else{
            res.status(400).json({
                success: false,
                message: 'Failed to register, please try again'
            });
        };

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Registration failed please try again",
        });
    };
}




//login controller
const loginUser =async(req,res) => {
    try {
        const {username, password} = req.body;

        //checking if entered username exists or not
        const user = await User.findOne({username});
        if(!username){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        //checking if entered password is correct or not
        const passwordCheck = await bcrypt.compare(password, user.password);
        if(!passwordCheck){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        //create user token
        const accessToken = jwt.sign({
            userId : user._id,
            username: user.username,
            role: user.role
        }, process.env.JWT_SECRET_KEY, {
            expiresIn : '15m'
        })
        
        res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            accessToken
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Registration failed please try again",
        });
    };
}

module.exports = {
    registerUser,
    loginUser
}