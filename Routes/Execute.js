// server/routes/execute.js
const express = require('express');
const { executeCode } = require('../Controllers/ExecuteControllers');

const router = express.Router();

router.post('/execute', executeCode);

module.exports = router;
