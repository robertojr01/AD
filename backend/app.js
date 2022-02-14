require('dotenv').config({ path: './.env' });

//Imports
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/mongodb');
const figlet = require('figlet');
const app = express();

//Routes Imports
const adminRoutes = require('./routes/Admin');
const droneRoutes = require('./routes/Drone');

//Cors
const corsOption = {
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    exposedHeaders: [
        "x-auth-token",
        "content-type",
        "X-Requested-With",
        "Authorization",
        "Accept",
        "Origin",
    ],
};

//Options
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Storage
app.use('/122-443', express.static(`${__dirname}/storage/`));

//Rutes Use
app.use(adminRoutes);
app.use(droneRoutes);

//Iniciar Mongo y el Backend
const port = process.env.PORT;
const domain = process.env.DOMAIN;

connectDB();
app.listen(port, () => {
    figlet('funchionando', (err, res) => {
        console.log(res);
        console.log(`Port --> ( ${port} )`);
        console.log(`Server Work in --> ( ${domain} )`);
    })
});