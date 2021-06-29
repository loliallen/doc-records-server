import { Schema, model } from "mongoose"
import { v4 } from "uuid"

export interface IUser {
    _id: string,
    phone: string,
    name: string,
    slot?: Date
}

const user_schema = new Schema<IUser>({
    _id:        { type: Schema.Types.String, default: v4 },
    phone:      { type: Schema.Types.String, maxlength: 16, unique: true},
    name:       { type: Schema.Types.String }
})

export default  {
    model: model<IUser>("User", user_schema)
}