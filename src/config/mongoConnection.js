const mongoose = require('mongoose');

async function connectToMongoDB(mongodb_uri) {
  return await mongoose.connect(mongodb_uri);
}

module.exports = connectToMongoDB;