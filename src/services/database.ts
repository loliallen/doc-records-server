import mongoose from "mongoose"
import config from "../config"

export default () => {
    console.log("[Database]: Connecting...")
    const CONNECT_OPTIONS = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
    mongoose.connect(
        config.database.uri,
        CONNECT_OPTIONS
    )

    

    const connection = mongoose.connection

    connection.on("error", () => {
        console.error('[Database]: Connection error')
    });

    connection.once("open", () => {
        console.log('[Database]: Connection success')
    })
}