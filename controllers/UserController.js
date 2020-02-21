/*
 * Created by Taufiq Rahman
 * email : Rahman.taufiq@gmail.com
 * Created on Sun Jan 26 2020
 *
 * Copyright (c) 2020 Bandung
 */
"use strict";

var response = require("../components/response");
var identity = require("../components/identity");
var crypto = require("crypto");
var bcrypt = require("bcrypt");
const saltRounds = 10;

const { Op } = require("sequelize");

const axios = require("axios");

const { user } = require("../models/index");

exports.signin = async function(req, res, next) {
  let user_name = req.body.username;
  let password = req.body.password;

  await user
    .findOne({
      where: {
        [Op.or]: [{ username: user_name }, { email: user_name }]
      }
    })
    .then(function(person) {
      if (!person) {
        response.responseNotFound("", "incorrect username", res);
        next();
      } else {
        person.validatePassword(password, function(result) {
          if (result) {
            person.generateAutkey();
            person.save();
            let data = {
              id: person.id,
              name: person.username,
              email: person.email
            };
            response.loginSuccess(data, person.auth_key, res);
            next();
          } else {
            response.responseNotFound("", "incorrect password", res);
            next();
          }
        });
      }
    })
    .catch(function(err) {
      response.responseNotValidate("", err.message, res);
      return;
    });
};

exports.signup = async function(req, res, next) {
  let user_name = req.body.username;
  let password_hash = await bcrypt.hash(req.body.password, saltRounds);
  let token = crypto.randomBytes(15).toString("hex");

  await user
    .findOrCreate({
      where: {
        username: user_name
      },
      defaults: {
        password_hash: password_hash,
        auth_key: token,
        email: req.body.email
      }
    })
    .spread(function(person, created) {
      if (created) {
        let data = {
          id: person.id,
          name: person.username,
          email: person.email
        };
        response.loginSuccess(data, person.auth_key, res);
        return;
      } else {
        response.responseNotValidate("", "user already exist", res);
        return;
      }
    })
    .catch(function(err) {
      console.log(err);
      console.log(err);

      //email duplicate error
      if (err.errors[0].message === "This email is already taken.") {
        response.responseNotValidate("", "email already exist", res);
        return;
      }
      // console.log(err.message);
      response.responseNotValidate(err.name, err.errors[0].message, res);
      return;
    });
};
// updatePassword need Bearer Token
exports.updatePassword = async (req, res, next) => {
  let id = identity.getId();
  console.log("updatePassword");
  try {
    const person = await user.findIdentity(id);
    console.log("person id:" + id);
    person.password_hash = await bcrypt.hash(req.params.password, saltRounds);
    person.auth_key = crypto.randomBytes(15).toString("hex");
    person.save();
    var data = {
      id: person.id,
      username: person.username,
      token: person.auth_key
    };
    response.responseUpdated(data, "", res);
    return;
  } catch (error) {
    console.log(error);
    response.responseFailed("bad request or no user exist", error, res);
    next();
  }
};
// showUser need Bearer Token
exports.showUser = async (req, res, next) => {
  console.log("showUser");
  let data = {
    id: identity.getId(),
    name: identity.getName(),
    email: identity.getEmail()
  };
  console.log("identity :" + identity.getId());
  // if (parseInt(req.params.id) !== parseInt(identity.getId())) {
  //     return response.responseUnauthorize('', '', res);
  // }
  response.responseSuccess(data, res);
};
// signOut need Bearer Token
exports.signOut = async (req, res, next) => {
  console.log("sign Out");
  let id = identity.getId();
  try {
    const person = await user.findIdentity(id);
    console.log("person id:" + id);
    person.auth_key = crypto.randomBytes(15).toString("hex");
    person.save();
    response.responseSuccess("Log out Success", res);
    return;
  } catch (error) {
    console.log(error);
    response.responseFailed("bad request or no user exist", error, res);
    next();
  }
};

exports.fbSignUpOrLogin = async function(req, res, next) {
  let user_name = req.body.username;
  let password_hash = await bcrypt.hash(req.body.password, saltRounds);
  let token = req.body.token;

  // your facebook app information
  let app_token = "YOUT_APP_ID|YOUR_APP_SECRET";
  let app_id = "YOUT_APP_ID";
  let app_name = "YOUR_APP_NAME";

  const url =
    "https://graph.facebook.com/debug_token?input_token=" +
    token +
    "&access_token=" +
    app_token;

  // Make a request to authenticate facebook token
  // and Verified the token is valid and from your app
  axios
    .get(url)
    .then(function(resp) {
      console.log("respon");
      console.log(resp.data);
      // if token come from your app and valid, do ....
      if (resp.data.data.is_valid && resp.data.data.app_id === app_id) {
        console.log("token is approved");
        user
          .findOrCreate({
            where: {
              email: req.body.email
            },
            defaults: {
              password_hash: password_hash,
              auth_key: token,
              email: req.body.email,
              username: user_name
            }
          })
          .spread(function(person, created) {
            // if user is not exist, create user
            if (created) {
              console.log("create user");
              let data = {
                id: person.id,
                name: person.username,
                email: person.email
              };

              person.update({
                auth_key: req.body.token
              });

              response.loginSuccess(data, person.auth_key, res);
              return;
            } else {
              // if user is  exist, update user token with fb token
              console.log("update user");
              person
                .update({
                  auth_key: req.body.token
                })
                .then(function() {
                  let data = {
                    id: person.id,
                    name: person.username,
                    email: person.email
                  };
                  response.loginSuccess(data, person.auth_key, res);
                });
              return;
            }
          })
          .catch(function(err) {
            //if create or update is error
            response.responseNotValidate(err.name, err.errors, res);
            return;
          });
      } else if (!resp.data.data.is_valid && resp.data.data.app_id === app_id) {
        // if token is expired and come from your app
        console.log("token expired");
        response.responseNotValidate("token expired", "token expired", res);
        return;
      } else {
        // if token is not valid or not coming from your app
        console.log("Token invalid");
        response.responseNotValidate("", "Token not valid", res);
        return;
      }
    })
    .catch(function(error) {
      // if axios request error or get response of 400
      console.log("axios not found");
      //   console.log(error);
      response.responseFailed(
        error.message,
        "Error or token is not from our app",
        res
      );
      return;
    })
    .finally(function() {
      // always executed

      console.log("okay");
      return;
    });
};
