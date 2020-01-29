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
var crypto = require("crypto");
var bcrypt = require('bcrypt');
const saltRounds = 10;


const {
    user
} = require('../models/index');

exports.signin = async function (req, res, next) {
    let user_name = req.body.username;
    let password = req.body.password;

    await user.findOne({
        where: {
            username: user_name
        }
    }).then(function (person) {
        if (!person) {
            response.responseNotFound('', 'incorrect username', res);
            next();
        } else {
            person.validatePassword(password, function (result) {
                if (result) {
                    person.generateAutkey();
                    person.save();
                    let data = {
                        id: person.id,
                        name: person.username,
                        email: person.email
                    }
                    response.loginSuccess(data, person.auth_key, res);
                    next();
                } else {
                    response.responseNotFound('', 'incorrect password', res);
                    next();
                }
            });

        }
    }).catch(function (err) {
        response.responseNotValidate('', err.message, res);
        return;
    })

};

exports.signup = async function (req, res, next) {
    let user_name = req.body.username;
    let password_hash = await bcrypt.hash(req.body.password, saltRounds);
    let token = crypto.randomBytes(15).toString('hex');

    await user.findOrCreate({
        where: {
            username: user_name
        },
        defaults: {
            password_hash: password_hash,
            auth_key: token,
            email: req.body.email
        }
    }).spread(function (person, created) {

        if (created) {
            let data = {
                id: person.id,
                name: person.username,
                email: person.email
            }
            response.loginSuccess(data, person.auth_key, res);
            return;
        } else {
            response.responseNotValidate('', 'user already exist', res);
            return;

        }
    }).catch(function (err) {
        console.log(err);
        // console.log(err.message);
        response.responseNotValidate(err.name, err.errors, res);
        return;
    })

};

exports.updatePassword = async (req, res, next) => {
    console.log('updatePassword')
    try {
        const person = await user.findIdentity(req.params.id);
        console.log('person id:' + person.id)
        console.log('identity :' + identity.getId())
        if (person.id !== identity.getId()) {
            return response.responseUnauthorize('', '', res);
        }
        person.password_hash = await bcrypt.hash(req.params.password, saltRounds);
        person.auth_key = crypto.randomBytes(15).toString('hex');
        person.save();
        var data = {
            id: person.id,
            username: person.username
        }
        response.responseUpdated(data, '', res);
        return;
    } catch (error) {
        console.log(error)
        response.responseFailed('bad request or no user exist', error, res)
        next()
    }

}

exports.showUser = async (req, res, next) => {
    console.log('showUser');
    let data = {
        id: identity.getId(),
        name: identity.getName(),
        email: identity.getEmail()
    }
    console.log('request id:' + req.params.id)
    console.log('identity :' + identity.getId())
    if (parseInt(req.params.id) !== parseInt(identity.getId())) {
        return response.responseUnauthorize('', '', res);
    }

    response.responseSuccess(data, res)
}