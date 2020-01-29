/*
 * Created by Taufiq Rahman
 * email : Rahman.taufiq@gmail.com
 * Created on Sun Jan 26 2020
 *
 * Copyright (c) 2020 Bandung
 */


'use strict';

var crypto = require("crypto");
var bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        'id': {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        'username': {
            type: DataTypes.STRING,
            unique: {
                msg: 'This username is already taken.'
            },
            validate: {
                len: {
                    args: 3,
                    msg: "Name must be atleast 3 characters in length"
                }
            }
        },
        'password_hash': DataTypes.STRING,
        'auth_key': DataTypes.STRING,
        'password_reset_token': DataTypes.STRING,
        'email': {
            type: DataTypes.STRING,
            unique: {
                arg: true,
                msg: 'This email is already taken.'
            },
            validate: {
                isEmail: true,
                isEmail: {
                    msg: "it is not a valid email"
                }
            }
        },
        'status': DataTypes.SMALLINT,
        'created_at': DataTypes.INTEGER,
        'updated_at': DataTypes.INTEGER

    }, {
        // individualHooks: true,
        hooks: {
            beforeCreate: (record, options) => {
                record.created_at = Math.floor(Date.now() / 1000);
                record.updated_at = Math.floor(Date.now() / 1000);
            },
            beforeUpdate: (record, options) => {
                record.updated_at = Math.floor(Date.now() / 1000);
            }
        }
    });
    //instanceMethods => dapat menggunakan data dalam table
    User.prototype.generateAutkey = function () {
        console.log('generate aut_key');
        this.auth_key = crypto.randomBytes(15).toString('hex');
        return;
    }

    User.prototype.setPassword = async function (password) {
        console.log('setPassword');
        return this.password_hash = await bcrypt.hash(password, saltRounds);
    }

    User.prototype.validatePassword = function (password, callback) {
        console.log('validate Password');
        bcrypt.compare(password, this.password_hash, function (err, result) {
            console.log('validate Password :' + result);
            callback(result)
        })
    }


    //classMethods =>tidak dapat menggunakan data dalam table
    User.findIdentity = function (id) {
        console.log('findIdentity')
        return User.findOne({
            where: {
                id: id
            }
        });
    }

    User.findByUsername = function (username) {
        console.log('findByUsername')
        return User.findOne({
            where: {
                username: username
            }
        });
    }

    User.findIdentityByTokenBearer = function (token) {
        console.log('findIdentityByTokenBearer')
        return User.findOne({
            where: {
                auth_key: token
            }
        });
    }

    User.findByPasswordResetToken = function (resetToken) {
        console.log('findByPasswordResetToken')
        return User.findOne({
            where: {
                password_reset_token: resetToken
            }
        });
    }


    return User;
}