import {Router} from "express"
import RecordRouter from "./record.router"
const router = Router()

router.use("/record", RecordRouter)

export default router