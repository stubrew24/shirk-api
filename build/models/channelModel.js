'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ChannelSchema = exports.ChannelSchema = new Schema({
    name: {
        type: String,
        required: 'Channel name is required.'
    },
    description: {
        type: String,
        required: 'Channel description is required.'
    },
    visibility: {
        type: String,
        required: 'Visibility required.'
    }
});
//# sourceMappingURL=channelModel.js.map