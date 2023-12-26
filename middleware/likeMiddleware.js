import jwt from 'jsonwebtoken'
//если авторизован то отображаются лайки
export default function(req, res, next) {
    // if (req.method === 'OPTIONS') {
    //     next()
    // } //пока не разобрался 
    try {
        if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decode
        next()
        } else {
            req.user = false
            next()
        }
    } catch (err) {
        console.log(err)
    }
}
