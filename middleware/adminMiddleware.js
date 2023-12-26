import jwt from 'jsonwebtoken'

export default function(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message:'не авторизован'})
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        if (decode.role === 'ADMIN') {
        next()
        } else {
            return res.status(403).json({message:'не админ'})
        }
    } catch (err) {
        return res.status(403).json({message:'не авторизован'})
    }
}