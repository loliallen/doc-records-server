import { Schema, model, PopulatedDoc, Document } from "mongoose"
import { v4 } from "uuid"
import { IDoctor } from "./DoctorModel"
import { IUser } from "./UserModel"

interface INotifications {
    one_day: boolean;
    two_hours: boolean
}

export interface IRecord{
    user_id: PopulatedDoc<IUser & Document>
    doctor_id: PopulatedDoc<IDoctor & Document>
    date: Date
    notifications: INotifications
}


const record_schema = new Schema<IRecord>({
    _id:        { type: Schema.Types.String, default: v4 },
    user_id:    { type: Schema.Types.String, ref: "User"},
    doctor_id:  { type: Schema.Types.String, ref: "Doctor"},
    date:       { type: Date, required: true },
    created_at: { type: Date, default: Date.now },
    notifications: {
        one_day: {type: Boolean, default: false},
        two_hours: {type: Boolean, default: false}
    }
})

export default  {
    model: model<IRecord>("Record", record_schema)
} 