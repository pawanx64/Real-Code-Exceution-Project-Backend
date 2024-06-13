// server/models/Execution.js
const mongoose = require('mongoose');

const ExecutionSchema = new mongoose.Schema({
  code: String,
  language: String,
  output: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Execution', ExecutionSchema);
