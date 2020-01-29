// config - main.js

const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    "development": {
        "serverport": process.env.PORT,
        "username": process.env.DBUSER,
        "password": process.env.DBPASS,
        "database": process.env.DBNAME,
        "host": process.env.DBHOST,
        "dialect": "mysql",
        "operatorsAliases": false,
        "define": {
            "timestamps": false,
            "freezeTableName": true
        }
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql",
        "operatorsAliases": false
    },
    "production": {
        "username": "root",
        "password": null,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql",
        "operatorsAliases": false
    }
}