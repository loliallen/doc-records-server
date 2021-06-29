import { CronJob } from "cron"
import RecordModel, { IRecord } from "../models/RecordModel"
import database from "./database"
import fs from "fs"
import config from "../config"
import UserModel from "../models/UserModel"
import DoctorModel from "../models/DoctorModel"


const diff_min = 2

/*
{{ current_date }} | Привет {{ user.name }}! Напоминаем что вы записаны к {{ doctor.spec }} завтра в {{ slot.time }}!
{{ current_date }} | Привет {{ user.name }}! Вам через 2 часа к {{ doctor.spec }} в {{ slot.time }}!
*/

enum TimeStamp {
    two_hours = "two hours",
    one_day = "one_day"
}

const log_to_file = (record: IRecord, ts: TimeStamp) => {
    if (ts === TimeStamp.one_day) {
        let s = (current_date: Date, user_name: string, doctor_spec: string, time: string) => `${current_date} | Привет ${user_name}! Напоминаем что вы записаны к ${doctor_spec} завтра в ${time}!\n`
        fs.appendFileSync(config.app.log_path, s(new Date(), record.user_id.name, record.doctor_id.spec, record.date.toLocaleTimeString()))
    } else if (ts === TimeStamp.two_hours) {
        let s = (current_date: Date, user_name: string, doctor_spec: string, time: string) => `${current_date} | Привет ${user_name}! Вам через 2 часа к ${doctor_spec} в ${time}!\n`
        fs.appendFileSync(config.app.log_path, s(new Date(), record.user_id.name, record.doctor_id.spec, record.date.toLocaleTimeString()))
    }
}

const checkRecord = async () => {
    const now = new Date(Date.now())
    let m_r2h = [
        new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours()+2, now.getMinutes()+diff_min),
        new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours()+2, now.getMinutes()-diff_min)
    ]
    let m_r1d = [
        new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes()+diff_min),
        new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes()-diff_min)
    ]
    let r2h = await RecordModel.model.find({
        date: {
            $gte: m_r2h[1],
            $lte: m_r2h[0]
        },
        "notifications.two_hours": false
    }).populate("user_id").populate("doctor_id")

    let r1d = await RecordModel.model.find({
        date: {
            $gte: m_r1d[1],
            $lte: m_r1d[0]
        },
        "notifications.one_day": false
    }).populate("user_id").populate("doctor_id")


    r2h.forEach(async (r) => {
        log_to_file(r, TimeStamp.two_hours)
        r.notifications.two_hours = true
        await r.save()
    })
    r1d.forEach(async (r) => {
        log_to_file(r, TimeStamp.one_day)
        r.notifications.one_day = true
        await r.save()
    })

}

const main = () => {
    database()
    UserModel.model.init()
    DoctorModel.model.init()
    console.log("[Service]: Started")
    let corn_job = new CronJob("0 */1 * * * *", checkRecord)
    corn_job.start()
}
main()