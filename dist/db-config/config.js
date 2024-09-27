"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
// export const sequelize = new Sequelize(
// //     {
// //     dialect : "oracle" ,
// //     database :  "sample-db",
// //     username :  "FUSION_DW",
// //     password : "FuS_dW_1123",
// //     host : "141.148.201.157",
// //     port : 1521,
// //     dialectOptions : {
// //         connectString : "141.148.201.157:1521/osmsdb.testospublic.testvcn.oraclevcn.com"
// //     }
// // });
// "SEQUELIZE","root ","dinesh", {
//     dialect :  "mysql"
// });
exports.sequelize = new sequelize_1.Sequelize("test", "root ", "dinesh", {
    dialect: "mysql",
});
