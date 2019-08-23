'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var UserSchema = exports.UserSchema = new Schema({
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
    username: {
        type: String,
        require: true
    },
    hashPassword: {
        type: String,
        required: true
    },
    channels: [{
        type: Schema.Types.ObjectId,
        ref: 'channel'
    }]
});

UserSchema.methods.comparePassword = function (password, hashPassword) {
    return _bcrypt2.default.compareSync(password, hashPassword);
};
//# sourceMappingURL=userModel.js.map