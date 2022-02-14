const Drone = require('../models/Drone');

//Create
const createDrone = async (req, res) => {
    const { name, model, serialNumber, flightTime, status } = req.body;
    
    const drone = new Drone({ name, model, serialNumber, buyDate: new Date(), flightTime, status })
    
    if( req.file ){
        const { filename } = req.file;
        drone.setImage( filename );
    }

    drone.save( (err, drn) => {
        err && res.status(500).json({ message: 'Error al guardar el drone' });
        console.log(drn);
        res.status(200).json({ message: 'Drone guardado correctamente' })
    })
}
//Get All
const getDrones = async (req, res) => {
    Drone.find( (err, adns) => {    
       err && res.status(500).json({ message: err.message })
    //    console.log(adns)
       res.status(200).json(adns)
    })
}
//Get By Id
const getDroneById = async (req, res) => {
    const { id } = req.params;
    Drone.findById(id, (err, adn) => {
        err && res.status(500).json({ message: err.message })
        console.log(adn)
        res.status(200).json(adn)
    })
}
//Edit by id
const editDroneById = async (req, res) => {
    const { id } = req.params;
    const { name, model, serialNumber, buyDate, flightTime, status } = req.body;

    Drone.findByIdAndUpdate(id, { name, model, serialNumber, buyDate, flightTime, status }, (err, adn) => {
        err && res.status(500).json({ message: err.message })
        console.log(adn)
        res.status(200).json(adn)
    })
}
//Delete
const deleteDrone = async (req, res) => {
    const { id } = req.params;
    Drone.findByIdAndDelete(id, (err, drn) => {
       err && res.status(500).json({ message: err.message })
       console.log(drn)
       res.status(200).json({ message: 'Drone eliminado correctamente' })
    })
}
//Edit Atribute By Select
const editAtributeSelects = async (req, res) => {
    const { ids, data } = req.body;
    for (let i = 0; i < ids.length; i++) {
        const element = ids[i];
        Drone.findByIdAndUpdate(element, { status: data }, (err, drn) => {
           err && res.status(500).json({ message: err.message })
           console.log(`actualizado correctamente ${i} --> total: ${ids.length}`)
        })
    }
    res.status(200).json({ message: 'Drones actualizados correctamente.' })
}

module.exports = { createDrone, getDrones, getDroneById, editDroneById, deleteDrone, editAtributeSelects };