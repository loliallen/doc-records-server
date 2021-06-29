const {config} = require('dotenv')
config()

const PORT = process.env.PORT || 8000
const LOG_FILE_PATH = process.env.LOG_FILE_PATH

const MONGODB_URI = process.env.MONGODB_URI

export default {
    app: {
        port: PORT,
        log_path: LOG_FILE_PATH || "./some.log"
    },
    database: {
        uri: MONGODB_URI || ""
    }
}