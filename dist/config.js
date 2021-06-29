"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = require('dotenv').config;
config();
var PORT = process.env.PORT || 8000;
var LOG_FILE_PATH = process.env.LOG_FILE_PATH;
var MONGODB_URI = process.env.MONGODB_URI;
exports.default = {
    app: {
        port: PORT,
        log_path: LOG_FILE_PATH || "./some.log"
    },
    database: {
        uri: MONGODB_URI || ""
    }
};
