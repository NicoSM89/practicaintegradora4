const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  premium: { type: Boolean, default: false },
  documents: [{
    name: { type: String },
    reference: { type: String }
  }],
  last_connection: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
