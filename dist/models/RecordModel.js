"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var uuid_1 = require("uuid");
var record_schema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Schema.Types.String, default: uuid_1.v4 },
    user_id: { type: mongoose_1.Schema.Types.String, ref: "User" },
    doctor_id: { type: mongoose_1.Schema.Types.String, ref: "Doctor" },
    date: { type: Date, required: true },
    created_at: { type: Date, default: Date.now },
    notifications: {
        one_day: { type: Boolean, default: false },
        two_hours: { type: Boolean, default: false }
    }
});
exports.default = {
    model: mongoose_1.model("Record", record_schema)
};
