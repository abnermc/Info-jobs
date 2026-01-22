import { Router } from "express";
import { JobController } from "../controllers/jobs";

const jobsRouter = Router()

jobsRouter.get('/health',(req, res)=>{
    return res.json({
        status: 'ok',
        uptime: process.uptime()
    })
})

jobsRouter.get('/', JobController.getAll)
jobsRouter.get('/:id', JobController.getId)
jobsRouter.post('/', JobController.create)
jobsRouter.put('/:id', JobController.update)
jobsRouter.patch('/:id', JobController.partialUpdate)
jobsRouter.delete('/:id', JobController.delete)