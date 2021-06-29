import mongoose from "mongoose"
import DoctorModel from "../models/DoctorModel"
import UserModel from "../models/UserModel"
import database from "../services/database"
import doctors from "./data.doctors.json"
import users from "./data.users.json"

const s = 1000 * 60 * 60 * 2 + 1000 * 60 * 5

const prefillDoctors = async () => {
    let res = doctors.map((d, i) => {
        return new DoctorModel.model({
            ...d,
            slots: Array.from(new Array(i + 2).keys()).map((j) => {
                let date = new Date(Date.now() + j * s)
                return date
            })
        })
    })
    await DoctorModel.model.create(res)
    console.log(res[0])
}

const prefillUsers = async () => {
    let res = users.map(u => {
        return new UserModel.model({
            ...u,
        })
    })
    await UserModel.model.create(res)
    console.log(res[0])
}

const main = async () => {
    database()

    await prefillDoctors()
    await prefillUsers()
    console.log("Prefilled")
    mongoose.disconnect()
}
main()