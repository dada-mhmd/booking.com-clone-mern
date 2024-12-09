import { validationResult } from "express-validator";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message:errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).json({ message: "User already exists" });

        user = new User(req.body);
        await user.save();

        const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn:"1d"});

        res.cookie('auth_token',token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
                maxAge: 86400000
        })
        return res.status(200).send({message:'Registration successful'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

