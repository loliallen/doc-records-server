import {Router, Request, Response} from "express"
import Controller from "../controllers/record.controller"

const router = Router()
const controller = new Controller()

router.post("/", async(req: Request, res: Response) => {
    let data = req.body
    try {
        let record = await controller.create(data)
        return res.status(201).json(record)
    } catch (e) {
        console.log(e)
        return res.status(403).json(e.message)
    }
})

export default router