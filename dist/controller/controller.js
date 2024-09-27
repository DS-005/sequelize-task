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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUser = void 0;
const user_model_1 = require("../models/user_model");
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Data = yield user_model_1.USER.findAll({
        // where : 
        //     sequelize.where( sequelize.col('name'),Op.substring ,"23")
        });
        res.status(201).json(Data);
    }
    catch (error) {
        res.status(404).json({ message: 'Failed to get user' });
        console.log("Error in Getuser function", error);
    }
});
exports.getUser = getUser;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Data = yield user_model_1.USER.findByPk(req.params.id);
        res.status(201).json(Data);
    }
    catch (error) {
        res.status(404).json({ message: 'Failed to get user by id' });
        console.log("Error in GetuserBy//id function");
    }
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, curr_date } = req.body;
        const user = yield user_model_1.USER.create({ name, curr_date });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(404).json({ message: 'Failed to get user' });
        console.log("Error in create User");
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const { name, curr_date } = req.body;
        const check = yield user_model_1.USER.findByPk(userId);
        if (check) {
            const [updated] = yield user_model_1.USER.update({ name, curr_date }, { where: { id: userId } });
            res.status(201).json(updated);
        }
        else {
            res.status(404).json({ message: "Id not found" });
        }
    }
    catch (error) {
        res.status(404).json({ message: "Failed to update user" });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteId = req.params.id;
        const item = yield user_model_1.USER.destroy({ where: { id: deleteId } });
        res.status(201).json({ message: `${item} item deleted successfully` });
    }
    catch (error) {
        res.status(404).json({ message: "Deletting error" });
    }
});
exports.deleteUser = deleteUser;
