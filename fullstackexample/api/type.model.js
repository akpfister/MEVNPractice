// type.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Post
let Session = new Schema({
  words_correct: {
    type: Number
  },
  typos: {
    type: Number
  },
  totalTime: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
},{
    collection: 'sessions'
});

module.exports = mongoose.model('Session', Session);
