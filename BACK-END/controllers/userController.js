import asyncHandler from "express-async-handler";
import User from '../models/userModel.js';
import generateToken from "../utils/generateToken.js";




const authUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email })
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)
        res.status(201).json({ _id: user._id, name: user.name, email: user.email });
    }
    else {
        res.status(400)
        throw new Error('Invaild email or password ')
    }

});

const registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;

    const exsistUser = await User.findOne({ email: email })

    if (exsistUser) {
        res.status(400)
        throw new Error('User is alreday exists')
    }

    const user = await User.create({
        name,
        email,
        password

    });

    if (user) {
        generateToken(res, user._id)
        res.status(201).json({ _id: user._id, name: user.name, email: user.email });
    }
    else {
        res.status(400)
        throw new Error('Invaild User Data')
    }

});


const LogoutUser = asyncHandler(async (req, res, next) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: "User Logged Out " })

});


const getUserProfile = asyncHandler(async (req, res, next) => {
    const user = {
        _id: req.user.id,
        name: req.user.name,
        email: req.user.email

    }
    res.status(200).json(user)
});



const updateUserProfile = asyncHandler(async (req, res, next) => {
    const user =await User.findById(req.user._id)

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser  = await user.save();
        
        res.status(200).json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
        });
    }
    else{
        res.status(404);throw new Error('User Not Found')
    }
   
});






export {
    authUser,
    registerUser,
    LogoutUser,
    getUserProfile,
    updateUserProfile,

}