/*
 * Created by Taufiq Rahman
 * email : Rahman.taufiq@gmail.com
 * Created on Sun Jan 26 2020
 *
 * Copyright (c) 2020 Bandung
 */
'use strict'
const BearerAuthorization = require('../components/authorizationBearer')
const Express = require('express')
const Controller = require('./../controllers/UserController')
const BASE_URL = '/v1/user'

module.exports = Express.Router({
        mergeParams: true
    })
    .get(`${BASE_URL}/showuser/:id`, BearerAuthorization, Controller.showUser)
    .post(`${BASE_URL}/signin`, Controller.signin)
    .post(`${BASE_URL}/signup`, Controller.signup)
    .put(`${BASE_URL}/:id/:password`, BearerAuthorization, Controller.updatePassword)