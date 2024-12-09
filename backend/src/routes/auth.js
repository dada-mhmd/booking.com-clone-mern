import express from 'express';
import { getToken, login, logout } from '../controllers/authCtrl.js';
import { check } from 'express-validator';
import { verifyToken } from '../middelwares/verifyToken.js';
const router = express.Router();

router.post('/login',[check('email','Email is required').isEmail(),
check('password','Password is required and must be at least 6 characters long').isLength({min:6}),
], login)

router.post('/logout', logout)
router.get('/validate-token', verifyToken, getToken)

export default router;