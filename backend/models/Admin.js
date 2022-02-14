const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const AdminSchema = Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    verify: { type: Boolean, enum: [true, false], default: false }
}, { versionKey: false })

AdminSchema.statics.encryptPassword = async function encryptPassword( password ){
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
AdminSchema.statics.comparePassword = async function comparePassword( password, receivePassword ){
    return await bcrypt.compare(password, receivePassword);
}

module.exports = mongoose.model('Admin', AdminSchema);