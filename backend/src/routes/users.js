import express from 'express';
import {  register } from '../controllers/userCtrl.js';
import { check } from 'express-validator';

const router = express.Router();

router.post('/register',[check('firstName','First name is required').isString(),
check('lastName','Last name is required').isString(),
check('email','Email is required').isEmail(),
check('password','Password is required and must be at least 6 characters long').isLength({min:6}),
], register)



export default router;