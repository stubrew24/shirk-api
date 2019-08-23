import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import { UserSchema } from '../models/userModel';

const User = mongoose.model('user', UserSchema);

export const userLogin = (req, res) => {
    User.findOne({username: req.body.username}, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.status(401).json({message: 'Authentication failed. No user found with those credentials.'})
        } else {
            if (!user.comparePassword(req.body.password, user.hashPassword)) {
                res.status(401).json({message: 'Authentication failed. No user found with those credentials.'})
            } else {
                const payload = {id: user._id}
                const token = jwt.sign(payload, process.env.SECRET, {
                    expiresIn: '30d'
                });
                res.cookie('token', token, { httpOnly: true }).status(200).json({message: 'success'})
            }
        }
    })
};

export const logout = (req, res) => {
    res.clearCookie('token').json({message: 'deleted'})
};