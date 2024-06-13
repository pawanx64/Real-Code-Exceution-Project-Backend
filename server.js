// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const executeRouter = require('./Routes/Execute');

// Initialize express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', executeRouter);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/remote-code-executor', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Socket.IO setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
