const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const domain = process.env.DOMAIN;

const DroneSchema = Schema({
    name: String,
    model: String,
    serialNumber: String,
    image: String,
    buyDate: Date,
    flightTime: Number,
    status: { type: String, enum: ['operational', 'not_operational', 'maintenance', 'removed'], default: 'operational'}
}, { timestamps: false });


DroneSchema.methods.setImage = function setImage(filename){
    this.image = `${domain}/122-443/${filename}`;
}


module.exports = mongoose.model('Drone', DroneSchema);