import { Likes,Work,Comment } from "../models/models.js"


class likeController {
    async add(req, res) {
        try {
            const {idCmnt,idWork} = req.body
            const us = req.user.id
            const poiskLikaUsera = await Likes.findOne({
                where: {
                    idCmnt,
                    idWork,
                    userId: us
                },
            }) 
            if (!poiskLikaUsera) {
                const sozdatLik = await Likes.create({idCmnt, idWork, userId:us})
               if (!idCmnt) {
                const postClikom = await Work.findOne({where:idWork})
                postClikom.likes = postClikom.likes + 1
                await postClikom.save() 
               } else {
                const komentPosta = await Comment.findOne({where: idCmnt})
                komentPosta.likes = komentPosta.likes + 1
                await komentPosta.save()
               }
                return res.status(201).json("лайк поставлен") 
            } else {
                if (!idCmnt) {
            const postClikom = await Work.findOne({where:idWork})
            postClikom.likes = postClikom.likes - 1
            await postClikom.save() 
                } else {
                    const komentPosta = await Comment.findOne({where: idCmnt})
                    komentPosta.likes = komentPosta.likes - 1
                    await komentPosta.save()
                }
            poiskLikaUsera.destroy()

            return res.status(204).json("лайк удален")
            }

    } catch (err) {
            return res.status(400).json("ошибка")
        }
    }

}

export default new likeController