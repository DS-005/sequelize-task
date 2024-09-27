"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller/controller");
const router = (0, express_1.default)();
router.get('/getuser', controller_1.getUser);
router.get('/getuser/:id', controller_1.getUserById);
router.post('/postuser', controller_1.createUser);
router.put('/updateuser/:id', controller_1.updateUser);
router.delete('/deleteuser/:id', controller_1.deleteUser);
exports.default = router;
