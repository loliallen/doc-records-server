"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var uuid_1 = require("uuid");
var user_schema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Schema.Types.String, default: uuid_1.v4 },
    phone: { type: mongoose_1.Schema.Types.String, maxlength: 16, unique: true },
    name: { type: mongoose_1.Schema.Types.String }
});
exports.default = {
    model: mongoose_1.model("User", user_schema)
};
