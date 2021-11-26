/*
 * Created by Taufiq Rahman
 * email : Rahman.taufiq@gmail.com
 * Created on Sun Jan 26 2020
 *
 * Copyright (c) 2020 Bandung
 */
const express = require("express");
const bodyParser = require('body-parser');
const router = require('./routes/index')()
const env = process.env.NODE_ENV || 'development';
const config = require('./config/main')[env];
const params = require('./config/params');
const cors = require("cors")

app = express();

// ALLOW CORS
app.use(cors());
// SET CORS for PREFLIGHT OPTIONS
app.options('*', cors());
// app.use((req, res, next) => {
//     console.log('request')
//     res.header("Access-Control-Allow-Origin", '*');
//     res.header("Content-Type", "application/json")
//     res.header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');
//     res.header('Access-Control-Allow-Headers: X-Requested-With, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding, X-Auth-Token');
//     if (req.method == "OPTIONS") {
//         console.log('request option')
//         res.status(200);
//         res.send();
//     } else {
//         next();
//     }

// });
app.use(bodyParser.json());
app.use('/api', router);


app.listen(config.serverport, () => {
    console.log('RESTful API server started on: ' + config.serverport);
    console.log('admin email : ' + params.adminEmail);
})