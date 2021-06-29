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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cron_1 = require("cron");
var RecordModel_1 = __importDefault(require("../models/RecordModel"));
var database_1 = __importDefault(require("./database"));
var fs_1 = __importDefault(require("fs"));
var config_1 = __importDefault(require("../config"));
var UserModel_1 = __importDefault(require("../models/UserModel"));
var DoctorModel_1 = __importDefault(require("../models/DoctorModel"));
var diff_min = 2;
/*
{{ current_date }} | Привет {{ user.name }}! Напоминаем что вы записаны к {{ doctor.spec }} завтра в {{ slot.time }}!
{{ current_date }} | Привет {{ user.name }}! Вам через 2 часа к {{ doctor.spec }} в {{ slot.time }}!
*/
var TimeStamp;
(function (TimeStamp) {
    TimeStamp["two_hours"] = "two hours";
    TimeStamp["one_day"] = "one_day";
})(TimeStamp || (TimeStamp = {}));
var log_to_file = function (record, ts) {
    if (ts === TimeStamp.one_day) {
        var s = function (current_date, user_name, doctor_spec, time) { return current_date + " | \u041F\u0440\u0438\u0432\u0435\u0442 " + user_name + "! \u041D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u0435\u043C \u0447\u0442\u043E \u0432\u044B \u0437\u0430\u043F\u0438\u0441\u0430\u043D\u044B \u043A " + doctor_spec + " \u0437\u0430\u0432\u0442\u0440\u0430 \u0432 " + time + "!\n"; };
        fs_1.default.appendFileSync(config_1.default.app.log_path, s(new Date(), record.user_id.name, record.doctor_id.spec, record.date.toLocaleTimeString()));
    }
    else if (ts === TimeStamp.two_hours) {
        var s = function (current_date, user_name, doctor_spec, time) { return current_date + " | \u041F\u0440\u0438\u0432\u0435\u0442 " + user_name + "! \u0412\u0430\u043C \u0447\u0435\u0440\u0435\u0437 2 \u0447\u0430\u0441\u0430 \u043A " + doctor_spec + " \u0432 " + time + "!\n"; };
        fs_1.default.appendFileSync(config_1.default.app.log_path, s(new Date(), record.user_id.name, record.doctor_id.spec, record.date.toLocaleTimeString()));
    }
};
var checkRecord = function () { return __awaiter(void 0, void 0, void 0, function () {
    var now, m_r2h, m_r1d, r2h, r1d;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                now = new Date(Date.now());
                m_r2h = [
                    new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 2, now.getMinutes() + diff_min),
                    new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 2, now.getMinutes() - diff_min)
                ];
                m_r1d = [
                    new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + diff_min),
                    new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() - diff_min)
                ];
                console.group("Query params");
                console.log("$gte", m_r2h[0]);
                console.log("$lte", m_r2h[1]);
                console.log("$gte", m_r1d[0]);
                console.log("$lte", m_r1d[1]);
                console.groupEnd();
                return [4 /*yield*/, RecordModel_1.default.model.find({
                        date: {
                            $gte: m_r2h[1],
                            $lte: m_r2h[0]
                        },
                        "notifications.two_hours": false
                    }).populate("user_id").populate("doctor_id")];
            case 1:
                r2h = _a.sent();
                return [4 /*yield*/, RecordModel_1.default.model.find({
                        date: {
                            $gte: m_r1d[1],
                            $lte: m_r1d[0]
                        },
                        "notifications.one_day": false
                    }).populate("user_id").populate("doctor_id")];
            case 2:
                r1d = _a.sent();
                console.log(r2h, r1d);
                r2h.forEach(function (r) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                log_to_file(r, TimeStamp.two_hours);
                                r.notifications.two_hours = true;
                                return [4 /*yield*/, r.save()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                r1d.forEach(function (r) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                log_to_file(r, TimeStamp.one_day);
                                r.notifications.one_day = true;
                                return [4 /*yield*/, r.save()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); };
var main = function () {
    database_1.default();
    UserModel_1.default.model.init();
    DoctorModel_1.default.model.init();
    var corn_job = new cron_1.CronJob("0 */1 * * * *", checkRecord);
    corn_job.start();
};
main();
