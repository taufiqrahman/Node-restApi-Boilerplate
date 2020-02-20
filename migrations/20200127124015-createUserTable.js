/*
 * Created by Taufiq Rahman
 * email : Rahman.taufiq@gmail.com
 * Created on Mon Jan 27 2020
 *
 * Copyright (c) 2020 Bandung
 */

"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("user", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(255),
        unique: true
      },
      password_hash: Sequelize.STRING(255),
      auth_key: Sequelize.STRING(255),
      password_reset_token: Sequelize.STRING(255),
      email: {
        type: Sequelize.STRING(255),
        unique: true
      },
      status: {
        type: Sequelize.SMALLINT,
        defaultValue: 10
      },
      created_at: Sequelize.INTEGER,
      updated_at: Sequelize.INTEGER
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("user");
  }
};
