const mongoose = require('mongoose');

const Schema = mongoose.Schema;

export const UserChannelSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    channelId: {
        type: String,
        required: true
    }
})