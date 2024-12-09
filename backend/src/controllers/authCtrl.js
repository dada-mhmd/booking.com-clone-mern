import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message:errors.array() });
    }

    const { email, password } = req.body
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User does not exist" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn:"1d"});

        res.cookie('auth_token',token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
                maxAge: 86400000
        })
        res.status(200).json({ userId:user._id });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });        
    }
}

export const logout = (req,res) => {
    res.cookie('auth_token', "", {
        expires: new Date(0)
    })
    res.send()
}

export const getToken =  (req,res) => {
    res.status(200).send({userId:req.userId})
}