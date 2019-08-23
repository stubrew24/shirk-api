const mongoose = require('mongoose');

const Schema = mongoose.Schema;

export const ChannelSchema = new Schema({
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
})