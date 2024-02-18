const mongoose = require('mongoose');
const readLine = require('readline');
const host = process.env.DB_HOST || '127.0.0.1'
const dbURI = `mongodb://${host}/travlr`;

// If the Node process ends, close the Mongoose connection
const connect = () => {
  setTimeout(() => mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }), 1000);
}
// CONNECTION EVENTS
mongoose.connection.on('connected', () => {
  console.log('connected');
});
// If the connection throws an error
mongoose.connection.on('error', err => {
  console.log('error: ' + err);
  return connect();
});
// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('disconnected');
});
// If the Node process ends, close the Mongoose connection
if (process.platform === 'win32') {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on('SIGINT', () => {
    process.emit("SIGINT");
  });
}
// BRING IN YOUR SCHEMAS & MODELS
const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};
// For nodemon restarts
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});
// Bring in your schemas and models
connect();

require('./travlr');
require('./user');