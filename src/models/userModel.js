import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    firstName: {
        type: String,
        required: 'Please enter a first name.'
    },
    lastName: {
        type: String,
        required: 'Please enter a last name.'
    },
    email: {
        type: String,
        required: 'Please enter an email address.',
        unique: true
    },
    userName: {
        type: String,
        require: true
    },
    hashPassword: {
        type: String,
        required: true
    }
});

UserSchema.methods.comparePassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword)
};