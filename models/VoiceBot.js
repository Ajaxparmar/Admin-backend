const mongoose = require('mongoose');

const VoiceBotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  logo: {
    type: String, 
    required: true
  },
  prompt: {
    type: String,
    required: true
  },
  identifier: {
    type: String, 
    required: true
  }
});

module.exports = mongoose.model('VoiceBot', VoiceBotSchema);
