// server/models/Form.js
const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
  responses: {
    type: Object,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Form', FormSchema);