// server/controllers/executeController.js
const { exec } = require('child_process');
const Execution = require('../Models/Execution');

exports.executeCode = async (req, res) => {
  const { code, language } = req.body;

  // Save the execution request to the database
  const execution = new Execution({ code, language });
  await execution.save();

  // Determine the command to run
  let command;
  if (language === 'python') {
    command = `python -c "${code}"`;
  } else if (language === 'javascript') {
    command = `node -e "${code}"`;
  } else {
    return res.status(400).json({ error: 'Unsupported language' });
  }

  // Execute the code
  exec(command, (error, stdout, stderr) => {
    if (error) {
      execution.output = error.message;
    } else {
      execution.output = stdout || stderr;
    }

    // Save the execution result
    execution.save();

    // Emit the result to the client
    if(req.io){
      req.io.emit('codeExecutionResult', execution);
    }
    else{
      console.error('Socket.io instance is not available');
    }

    res.json(execution);
  });
};
