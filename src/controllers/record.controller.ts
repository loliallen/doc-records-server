import Record from "../models/RecordModel"
import User from "../models/UserModel"
import Doctor from "../models/DoctorModel"
import validator from "validator"
import { ICreateRecordData } from "../intefaces"


const validateData = (data: ICreateRecordData) => {
    /*
    {
        user_id: 'uuid',    
        doctor_id: 'uuid',
        slot: 'uuid'
    }
    */
   console.log(data)
}

export default class Controller {
    models = {
        Record:Record.model,
        User:User.model,
        Doctor:Doctor.model
    }

    async create(data: ICreateRecordData){
        validateData(data)
        let user = await this.models.User.findById(data.user_id)
        let doctor = await this.models.Doctor.findById(data.doctor_id)
        let slot = new Date(data.slot)
        if (!user || !doctor){
            console.group("Data")
            console.log(user)
            console.log(doctor)
            console.groupEnd()
            throw new Error("Invalid data")
        }
        console.log(doctor)
        console.log(slot, doctor.slots)
        let slot_index = doctor.slots.findIndex(s => s.getTime() === slot.getTime())
        
        if (slot_index === -1)
           throw new Error("Slot is not avaliable")

        user.slot = slot
        let [used_slot] = doctor.slots.splice(slot_index, 1)
        doctor.used_slots.push(used_slot)

        let instance = new this.models.Record({
            user_id:    data.user_id,
            doctor_id:  data.doctor_id,
            date:       data.slot
        })
        await instance.save()
        await doctor.save()
        return instance
    }
}