const Admin = require('../models/Admin');
const sendMail = require('../middlewares/Mail');
const jwt = require('jsonwebtoken');

//Create
const createAdmin = async (req, res) => {
    const { name, email, role } = req.body;
    
    //Verificar que el email no esta creado anteriormente
    const adminFound = await Admin.findOne({ email });
    if( adminFound ) return res.status(500).json({ message: 'Admin creado anteriormente' });
    
    const pass = Math.random().toString(36).slice(-8);
    const admin = new Admin({
        name, email, role, password: await Admin.encryptPassword( pass )
    })
    
    await admin.save( (err, adm) => {
        err && res.status(500).json({ message: 'Error al guardar el admin' });
        // console.log('in save', adm);
        res.status(200).json({ message: 'Usuario creado correctamente.' })
    })

    await sendMail(admin._id, name, email, pass, role) //Enviar email de verificacion
}
//Login
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    
    //Verificar que existe el Admin
    const adminFound = await Admin.findOne({ email });
    if( !adminFound ) return res.status(500).json({ message: 'Usuario no encontrado' });
    
    //Verificar la contraseña
    const matchPassword = await Admin.comparePassword(password, adminFound.password);
    if( !matchPassword ) return res.status(500).json({ message: 'Contraseña no coincide' });

    //Si el Admin no está verificado
    if( !adminFound.verify ) return res.status(500).json({ message: 'Usuario no verificado' });

    const token = jwt.sign({ id: adminFound._id }, process.env.JWT_PASSWORD, { });
    res.status(200).json({ token })
}
//Get All
const getAdmins = async (req, res) => {
    Admin.find( (err, adms) => {
       err && res.status(500).json({ message: err.message })
       console.log(adms)
       res.status(200).json(adms)
    })
}
//Verify
const verifyAdmin = async (req, res) => {
    const { id } = req.params;
    Admin.findByIdAndUpdate(id, { verify: true }, (err, adm) => {
       err && res.status(500).json({ message: err.message })
       console.log(adm)
       res.status(200).json({ message: 'Admin verificado correctamente.' })
    })
}
//Delete
const deleteAdmin = async (req, res) => {
    const { id } = req.params;
    Admin.findByIdAndDelete(id, (err, adm) => {
        err && res.status(500).json({ message: err.message })
        console.log(adm)
        res.status(200).json({ message: 'Eliminado Correctamente' })
    })
}

module.exports = { createAdmin, loginAdmin, getAdmins, verifyAdmin, deleteAdmin };