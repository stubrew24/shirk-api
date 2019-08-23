'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserChannelSchema = exports.UserChannelSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    channelId: {
        type: String,
        required: true
    }
});
//# sourceMappingURL=userChannelModel.js.map