"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var uuid_1 = require("uuid");
var doctor_schema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Schema.Types.String, default: uuid_1.v4 },
    name: { type: mongoose_1.Schema.Types.String },
    spec: { type: mongoose_1.Schema.Types.String },
    slots: [{ type: mongoose_1.Schema.Types.Date }],
    used_slots: [{ type: mongoose_1.Schema.Types.Date }],
});
exports.default = {
    model: mongoose_1.model("Doctor", doctor_schema)
};
