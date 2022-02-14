const express = require('express');
const route = express.Router();
const { createAdmin, loginAdmin, getAdmins, verifyAdmin, deleteAdmin } = require('../controllers/Admin');

route.post('/register_admin', createAdmin);
route.post('/login_admin', loginAdmin);
route.get('/get_admins', getAdmins);
route.get('/verify_admin/:id', verifyAdmin);
route.get('/delete_admin/:id', deleteAdmin);

module.exports = route;