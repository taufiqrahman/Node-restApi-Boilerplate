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

app = express();
app.use(bodyParser.json());
app.use('/api', router);

app.listen(config.serverport, () => {
    console.log('RESTful API server started on: ' + config.serverport);
    console.log('admin email : ' + params.adminEmail);
})