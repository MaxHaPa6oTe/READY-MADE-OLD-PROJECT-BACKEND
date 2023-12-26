import Router from "express";
import workController from '../controllers/workController.js'
import adminMiddleware from "../middleware/adminMiddleware.js";
import likeMiddleware from '../middleware/likeMiddleware.js'

const router = new Router()

router.post('/', adminMiddleware, workController.add)
router.get('/', likeMiddleware, workController.all)
router.get('/:id', likeMiddleware, workController.getOne)
// router.delete('/:id', adminMiddleware, workController.delete)

export default router