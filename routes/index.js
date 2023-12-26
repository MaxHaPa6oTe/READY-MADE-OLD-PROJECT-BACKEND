import Router from "express";
import commentRouter from './commentRouter.js'
import userRouter from './userRouter.js'
import workRouter from './workRoutes.js'
import likeRouter from './likeRouter.js'

const router = new Router()

router.use('/user', userRouter)
router.use('/comments', commentRouter)
router.use('/post', workRouter)
router.use('/like', likeRouter)

export default router