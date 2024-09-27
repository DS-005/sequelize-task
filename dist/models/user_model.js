"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../db-config/config");
exports.USER = config_1.sequelize.define('XX_1620_SAMPLES', {
    id: {
        type: sequelize_1.DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    curr_date: {
        type: sequelize_1.DataTypes.NUMBER,
    }
}, {
    timestamps: false,
    freezeTableName: true
});
