/*
 * Created by Taufiq Rahman
 * email : Rahman.taufiq@gmail.com
 * Created on Sun Jan 26 2020
 *
 * Copyright (c) 2020 Bandung
 */
'use strict';

var id = null,
    name = null,
    email = null;

exports.setUsername = function (value) {
    name = value;
}

exports.setId = function (value) {
    id = value;
}

exports.setEmail = function (value) {
    email = value;
}

exports.getName = function () {
    return name;
}

exports.getId = function () {
    return id;
}

exports.getEmail = function () {
    return email;
}