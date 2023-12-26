import Router from "express";
import CommentController from '../controllers/commentController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import likeMiddleware from '../middleware/likeMiddleware.js'

const router = new Router()

router.post('/', authMiddleware, CommentController.add)
router.get('/:id', likeMiddleware, CommentController.all)
router.delete('/del', CommentController.del)

export default router