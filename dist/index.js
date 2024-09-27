"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./db-config/config");
const web_services_1 = require("./services/web-services");
const startup = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Starting application ...`);
    try {
        console.log('Initializing web server module');
        yield (0, web_services_1.initServer)();
    }
    catch (error) {
        console.log("DataBase connection is failed", error);
        process.exit(1);
    }
});
config_1.sequelize.authenticate()
    .then(() => {
    console.log("Database connected successfully ");
})
    .catch((error) => {
    console.log(error);
});
config_1.sequelize.sync({ alter: true })
    .then(() => { console.log("DataBase sync completed"); })
    .catch((error) => { console.log("Error in creating table "), error; });
const shutdown = (e) => __awaiter(void 0, void 0, void 0, function* () {
    let err = e;
    console.log("Shutting down the application ");
    try {
        console.log("Closing web server module ");
        yield (0, web_services_1.closeServer)();
    }
    catch (error) {
        console.log("Error occured in shutting down ", error);
        err = err || error;
    }
    if (err) {
        process.exit(1);
    }
    else {
        process.exit(0);
    }
});
process.on('SIGTERM', (signal) => {
    console.log(`Received ${signal}`);
    shutdown();
});
process.on('SIGINT', (signal) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Received ${signal}`);
    shutdown();
}));
process.on('uncaughtException', (err) => {
    console.log(`uncaught exception ${err}`);
    shutdown();
});
startup();
