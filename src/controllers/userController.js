import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

import { UserSchema} from "../models/userModel";

const User = mongoose.model('user', UserSchema);

export const getUsers = (req, res) => {
    User.find({}, (err, users) => {
        if (err) res.status(400).json({error: err});
        res.json(users);
    })
};

export const addUser = (req, res) => {
    console.log(req.body)
    const newUser = new User(req.body);
    newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);

    newUser.save((err, user) => {
        if (err) res.status(400).json({error: err});

        user.hashPassword = undefined;
        res.json(user);
    })
};

export const showUser = (req, res) => {
    User.findById({_id: req.params.userId}).exec((err, user) => {
        if (err) res.status(400).json({error: err});
        res.json(user)
    })
}