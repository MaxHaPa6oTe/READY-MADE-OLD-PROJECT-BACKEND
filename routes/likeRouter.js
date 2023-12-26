import Router from "express";
import likeController from "../controllers/likeController.js";
import authMiddleware from '../middleware/authMiddleware.js'

const router = new Router()

router.post('/', authMiddleware, likeController.add)
// router.post('/likeCmnt', authMiddleware, likeController.likeCmnt)
// router.get('/likeWork', authMiddleware, likeController.likeWork)

export default router