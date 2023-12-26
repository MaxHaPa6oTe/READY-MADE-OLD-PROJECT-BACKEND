import Router from "express";
import UserController from "../controllers/userController.js";
import authMiddleware from '../middleware/authMiddleware.js'

const router = new Router()

router.post('/reg', UserController.reg)
router.post('/login', UserController.login)
router.get('/auth', authMiddleware, UserController.auth)
router.get('/users', UserController.kolich)
router.get('/pr', UserController.proverka)
router.get('/reg0', UserController.reg0)
router.post('/prKod', UserController.provekraKoda)
router.get('/:id', UserController.prosmotrUsera)
router.post('/ava',authMiddleware,UserController.smenaAvu)

export default router