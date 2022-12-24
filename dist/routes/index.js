"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var images_1 = __importDefault(require("./api/images"));
var Routes = express_1.default.Router();
//makes sure that the route is working properly
Routes.get('/', function (req, res) {
    res.send('routes main have been reached');
});
Routes.use('/Images', images_1.default);
exports.default = Routes;
