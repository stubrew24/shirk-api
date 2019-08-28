const mongoose = require("mongoose");

const Schema = mongoose.Schema;

export const PostSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  channelId: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    required: true
  },
  dateUpdated: {
    type: Date,
    required: false
  }
});
