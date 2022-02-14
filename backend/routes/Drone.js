const express = require('express');
const route = express.Router();
const { createDrone, getDrones, getDroneById, deleteDrone, editDroneById, editAtributeSelects } = require('../controllers/Drone');
const { upload } = require('../libs/drone-multer');

route.post('/create_drone', upload.single('image'), createDrone);
route.get('/get_drones', getDrones);
route.get('/get_drone/:id', getDroneById);
route.put('/edit_drone/:id', editDroneById),
route.put('/edit_drones_by_select', editAtributeSelects)
route.delete('/delete_drone/:id', deleteDrone);

module.exports = route;