"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeServer = exports.initServer = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const webServer_1 = require("../config/webServer");
const router_1 = __importDefault(require("../routes/router"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const app = (0, express_1.default)();
let httpServer;
const initServer = () => {
    return new Promise((resolve, reject) => {
        app.use(express_1.default.json()); // JSON parsing middleware
        app.use((0, cors_1.default)()); // CORS middleware
        app.use(express_1.default.urlencoded({ extended: true })); // URL-encoded body parsing middleware
        app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public"))); // Static files middleware
        // Mount the routes
        app.use(process.env.BASE_URL || "/api", router_1.default);
        // Handle 404 errors
        app.use((req, res) => {
            res.status(404).send("404: File Not Found");
        });
        // Start the server
        httpServer = app
            .listen(webServer_1.port, () => {
            console.log(`Web server listening on ${webServer_1.port}`);
            resolve();
        })
            .on("error", (err) => {
            reject(err);
        });
    });
};
exports.initServer = initServer;
const closeServer = () => {
    return new Promise((resolve, reject) => {
        httpServer.close((err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
};
exports.closeServer = closeServer;
