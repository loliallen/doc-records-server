
export interface ICreateDoctorData {
    name: string,
    spec: string,
    slots: Array<Date>
}

export interface ICreateUserData {
    name: string,
    phone: string
}

export interface ICreateRecordData {
    user_id: string,
    doctor_id: string,
    slot: Date
}