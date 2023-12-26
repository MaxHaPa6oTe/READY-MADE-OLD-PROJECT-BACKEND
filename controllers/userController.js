import * as uuid from 'uuid'
import {User,Comment} from '../models/models.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

class UserController {
    async reg0(req, res) {
        try {
        const { usPocht } = req.query
        const candidat = await User.findOne({where: {email:usPocht}})
        if (candidat) {
            return res.status(200).json('Данная почта уже занята')
        }
        return res.status(200).json('Good')
    } catch (e) {
        return res.status(400).json('ошибка2')
    }
    }

    async reg(req, res) {
        try {
        const { email, password, role, name, years } = req.body
        
        if (email.length < 5 || password.length < 5) {
            return res.status(400).json('неправильно введенные данные')
        } 
        const hashPassword = await bcrypt.hash(password,2) 

        if (req.files) {
        const {ava} = req.files
        let fileName = uuid.v4() + '.jpg'
        ava.mv('./static/' + fileName)
        const user = await User.create({email, password: hashPassword, role, 
            name, years, ava: fileName})
            const token = jwt.sign({
                id: user.id,
                role,
                name,
                years,
                ava,
                email
            }, process.env.SECRET_KEY, {expiresIn: '12h'})
    
            return res.status(201).json(token)
        } else {
        const userr = await User.create({email, password: hashPassword, role, 
            name, years})    
            const token = jwt.sign({
                id: userr.id,
                role,
                name,
                years,
                email
            }, process.env.SECRET_KEY, {expiresIn: '12h'})
    
            return res.status(201).json(token)
        }

        } catch (err) {
            return res.status(400).json('ошибка1')
        }
    }

    async login(req, res) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return res.status(401).json('неверный логин или пароль')
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return res.status(401).json('неверный логин или пароль')
        }
        const token = jwt.sign({
            id: user.id,
            role: user.role,
            name: user.name,
            years: user.years,
            ava: user.ava,
            email: user.email
        }, process.env.SECRET_KEY, {expiresIn: '12h'})
        return res.json({token})
    }

    async auth(req, res) {
        const token = jwt.sign({
            id: req.user.id,
            role: req.user.role,
            name: req.user.name,
            years: req.user.years,
            ava: req.user.ava,
            email: req.user.email
        }, process.env.SECRET_KEY, {expiresIn: '12h'})
        return res.status(200).json({token})
    }


    async kolich(req, res) {
        const count = await User.count()
        return res.status(200).json(count)
    }


    async proverka(req, res) {
        try{
            const {usPocht} = req.query
            const transporter = nodemailer.createTransport(
                {
                host:'smtp.yandex.com',
                port: 465,
                secure: true,
                auth: {
                    user:process.env.EMAIL,
                    pass:process.env.PASSWORD
                }, 
            })
        
            let sifr = usPocht.match( /\d/g );
            sifr = sifr ? sifr = sifr.length : 0;
            let sifr1 = usPocht.match(/[A-Z]/g)
            sifr1 = sifr1 ? sifr1 = sifr1.length : 0;
            let sifr2 = usPocht.match(/[.-]/g) 
            sifr2 = sifr2 ? sifr2 = sifr2.length : 0;            
            let sifr3 = sifr + 1 +''+ sifr1 + 9 +''+ sifr2 + 3 +''+ usPocht.length - 7
            
        const mailOptions = {
            from: process.env.EMAIL,
            to: usPocht,//куда
            subject:'Регистрации на сайте Макса',
            text: `Код для подтверждения почты:   ${sifr3}`
        }
        
        await transporter.sendMail(mailOptions)
        return res.status(200).json('Письмо отправлено')
        } catch (e) {return res.status(400).json(e)
        }
}

async provekraKoda(req, res) {
try {
    const {usPochts,kods} = req.body
    let sifr = usPochts.match( /\d/g );
    sifr = sifr ? sifr = sifr.length : 0;
    let sifr1 = usPochts.match(/[A-Z]/g)
    sifr1 = sifr1 ? sifr1 = sifr1.length : 0;
    let sifr2 = usPochts.match(/[.-]/g) 
    sifr2 = sifr2 ? sifr2 = sifr2.length : 0;            
    const sifr3 = sifr + 1 +''+ sifr1 + 9 +''+ sifr2 + 3 +''+ usPochts.length - 7
    if (+kods === +sifr3) {
        return res.status(200).json('Успешно')
    } else {
        return res.status(400).json('Не правильно')
    }
} catch (e) {
    return res.status(400).json('ошибка на сервере')
}}

async prosmotrUsera(req,res) {
    try {
    const {id} = req.params
    const  user = await User.findOne({where: +id})
    return res.status(200).json(user)
    } catch (e) {
        return res.status(400).json('ошибка на сервере')
    }
}

async smenaAvu(req,res) {
    try {
const {id} = req.body
const {ava} = req.files
let fileNam = uuid.v4() + '.jpg'
const Usser = await User.findOne({where: +id})
Usser.ava = fileNam
await Usser.save() 
await Comment.update({avtor:[Usser.name,Usser.years,fileNam]},
    {where: {userId: +id}})
ava.mv('./static/' + fileNam)
return res.status(200).json('Поменялась')
    } catch (e) {
        return res.status(40).json(e)
    }
}
}

export default new UserController