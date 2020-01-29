/*
 * Created by Taufiq Rahman
 * email : Rahman.taufiq@gmail.com
 * Created on Sun Jan 26 2020
 *
 * Copyright (c) 2020 Bandung
 */
'use strict';
var response = require('../components/response');
var identity = require('../components/identity');
const {
    user
} = require('../models/index');

const HEADER_AUTHORIZATION = 'authorization';

module.exports = async (req, res, next) => {
    const authorization = req.headers[HEADER_AUTHORIZATION];

    if (authorization) {
        const parts = authorization.split(' ');

        if (parts.length === 2) {
            const scheme = parts[0];
            const token = parts[1];
            console.log('scheme 1: ' + scheme)
            console.log('token 1: ' + token)
            let validToken = await user.findIdentityByTokenBearer(token);
            // console.log(validToken);
            if (!validToken) {
                console.log('token: not exist in db')
                return response.responseUnauthorize('', '', res);
            }
            identity.setId(validToken.id);
            identity.setUsername(validToken.username)
            identity.setEmail(validToken.email)
            next();
        }
    } else {
        console.log('token: no token')
        response.responseUnauthorize('', '', res);
    }
};