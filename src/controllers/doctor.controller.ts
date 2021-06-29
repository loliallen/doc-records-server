import { ICreateDoctorData } from "../intefaces"

const Model = require("../models/DoctorModel")
const {default: validator} = require("validator")


const validateData = (data: ICreateDoctorData) => {
    if (!data.name || !data.spec || !data.slots){
        throw new Error("Invalid data")
    }

    let is_valid_date = true
    if (Array.isArray(data.slots))
        // array of uuids
        for(let d of data.slots){
            if (!validator.isDate(d)) {
                is_valid_date = false
                break
            }
        }
    if (!is_valid_date)
        throw new Error("Invalid field in: slots[]")
}
class Controller {
    model = Model

    async create(data:ICreateDoctorData){
        validateData(data)
        const instance = new this.model(data)
        instance.save()
        return instance
    }
}

module.exports = Controller