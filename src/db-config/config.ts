import { Sequelize } from "sequelize";

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

export const sequelize = new Sequelize("test", "root", "dinesh", {
  dialect: "mysql",
  logging:console.log
});
