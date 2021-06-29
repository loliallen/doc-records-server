import { ICreateUserData } from "../intefaces"
import Model from "../models/UserModel"

const validateData = (data: ICreateUserData) => {
    if (!data.name || !data.phone){
        throw new Error("Invalid data")
    }

    let phone_reg = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
    if (!phone_reg.test(data.phone))
        throw new Error("Invalid phone number")
}
class Controller {
    model = Model.model

    async create(data: ICreateUserData){
        validateData(data)
        const instance = new this.model(data)
        await instance.save()
        return instance
    }
}

module.exports = Controller