/*
 * Created by Taufiq Rahman
 * email : Rahman.taufiq@gmail.com
 * Created on Sun Jan 26 2020
 *
 * Copyright (c) 2020 Bandung
 */
/**
 * response Unauthorized
 */
exports.responseUnauthorize = function (error, message, res) {
    var message = message !== '' ? message : 'You dont have access resource!';
    var error = error !== '' ? error : 'Unauthorized'
    var data = {
        'statusCode': 401,
        'name': '401 Unauthorized',
        'message': message,
        'error': error
    };
    return res.status(401).json(data);
}
/**
 * response Not Found
 */
exports.responseNotFound = function (error, message, res) {
    var data = {
        'statusCode': 404,
        'name': '404 Not Found',
        'message': message,
        'error': error
    };
    return res.status(404).json(data);
}

/**
 * response Validate error response
 */
exports.responseNotValidate = function (error, message, res) {
    var message = message !== '' ? message : 'Error validation';
    var error = error !== '' ? error : 'Please check request data'
    var data = {
        'statusCode': 422,
        'name': 'ValidateErrorException',
        'message': message,
        'errors': error
    }
    return res.status(422).json(data);
}

/**
 * response Created response
 */
exports.responseCreated = function (dataArray, message, res) {
    var message = message !== '' ? message : 'Created successfully';
    var data = {
        'statusCode': 201,
        'message': message,
        'data': dataArray
    }
    return res.status(422).json(data);
}

exports.ok = function (values, res) {

    var values = values !== '' ? value : 'Your request not exist, please contact Admin!';
    var data = {
        'statusCode': 200,
        'values': values
    };
    return res.status(200).json(data);
};


exports.responseSuccess = function (message, res) {
    var data = {
        "statusCode": 200,
        "message": message
    };
    return res.status(200).json(data);
}

exports.loginSuccess = function (message, token, res) {
    var data = {
        "statusCode": 200,
        "message": message,
        "token": token
    }
    return res.status(200).json(data);
}

/**
 * response Collection response
 */
exports.responseList = function (dataArray, total, message, res) {
    var message = message !== '' ? message : 'Data retrieval successfully';
    var data = {
        'statusCode': 201,
        'message': message,
        'data': dataArray,
        'total': total
    }
    return res.status(201).json(data);
}

/**
 * response Updated response
 */
exports.responseUpdated = function (dataArray, message, res) {
    var message = message !== '' ? message : 'Updated successfully';
    var data = {
        'statusCode': 202,
        'message': message,
        'data': dataArray
    }
    return res.status(202).json(data);
}

/**
 * response Fail - 400 Bad Request
 */
exports.responseFailed = function (message, error, res) {
    var message = message !== '' ? message : 'check your request!';
    var error = error !== '' ? error : 'Process Failed'
    var data = {
        'statusCode': 400,
        'name': '400 Bad Request',
        'message': message,
        'error': error
    }
    return res.status(400).json(data);
}