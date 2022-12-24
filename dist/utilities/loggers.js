"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger = function (req, res, next) {
    console.log("".concat(req.query.title, "was modified"));
    next();
};
exports.default = logger;
