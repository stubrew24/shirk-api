"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PostSchema = exports.PostSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
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
//# sourceMappingURL=postModel.js.map