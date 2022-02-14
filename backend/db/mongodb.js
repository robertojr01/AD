const mongoose = require('mongoose');

mongoose.connection.on('open', () => console.log('db conectada'))

async function connectDB(){
    const uri = 'mongodb://localhost:27017/avistadrone'
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
}

module.exports = connectDB;