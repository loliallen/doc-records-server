import { Schema, model, PopulatedDoc, Document } from "mongoose"
import { v4 } from "uuid"


export interface IDoctor {
    name: string,
    spec: string,
    slots: Date[],
    used_slots: Date[],
}

const doctor_schema = new Schema<IDoctor>({
    _id:                    { type: Schema.Types.String, default: v4 },
    name:                   { type: Schema.Types.String },
    spec:                   { type: Schema.Types.String },
    slots:                  [{ type: Schema.Types.Date }],
    used_slots:             [{ type: Schema.Types.Date }],
})

export default {
    model:  model<IDoctor>("Doctor", doctor_schema)
}
