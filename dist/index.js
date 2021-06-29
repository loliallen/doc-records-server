"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require("express")
// const bodyParser = require("body-parser")
// const config = require("./config")
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var config_1 = __importDefault(require("./config"));
var routers_1 = __importDefault(require("./routers"));
var database_1 = __importDefault(require("./services/database"));
var app = express_1.default();
database_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use("/api", routers_1.default);
app.listen(config_1.default.app.port, function () {
    console.log("Server listening on port", config_1.default.app.port);
});
