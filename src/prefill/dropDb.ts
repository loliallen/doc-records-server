import mongoose from "mongoose"
import database from "../services/database"

const main = async () => {
    database()
    await mongoose.connection.dropDatabase()
    mongoose.disconnect()
    console.log("Database dropped")
}
main()