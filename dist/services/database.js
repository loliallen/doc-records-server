"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var config_1 = __importDefault(require("../config"));
exports.default = (function () {
    console.log("[Database]: Connecting...");
    var CONNECT_OPTIONS = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    };
    mongoose_1.default.connect(config_1.default.database.uri, CONNECT_OPTIONS);
    var connection = mongoose_1.default.connection;
    connection.on("error", function () {
        console.error('[Database]: Connection error');
    });
    connection.once("open", function () {
        console.log('[Database]: Connection success');
    });
});
