const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Read all files in the current directory (except index.js)
const modelFiles = fs.readdirSync(__dirname).filter(file => file !== 'index.js');

// Import all models and export them as an object
const models = {};
modelFiles.forEach(file => {
  const modelName = path.basename(file, '.js');
  models[modelName] = require(`./${file}`);
});

module.exports = models;
