// user.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Post
let Users = new Schema({
  username: {
    type: String,
    required: true
    //use trim:true to cut out whitespace
    //use required:true to require a property
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
},{
    collection: 'users'
});

module.exports = mongoose.model('Users', Users);
