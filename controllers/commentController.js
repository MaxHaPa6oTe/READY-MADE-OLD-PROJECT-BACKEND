import { Op } from "sequelize"
import { Comment, Likes, User, Work } from "../models/models.js"

class CommentController {
    async add(req, res) {
        try {
        const {text, workId} = req.body
        if (text.length < 3) {
            return res.status(400).json('слишком коротко')
        }
        const usar = await User.findOne({where: {id:req.user.id}})
        const comment = await Comment.create({text,
            avtor: [req.user.name,
                req.user.years,
                usar.ava],//при изменении авы отображается старая поэтому + 1 запрос
            userId: req.user.id, workId})
        const work = await Work.findOne({where:{id:workId}})
        work.cmnt = work.cmnt + 1
        await work.save() 
            return res.status(201).json('коммент добавлен')
        } catch (err) {
            return res.status(400).json('что-то не так')  
        }
    }

    async all(req, res) {
        const user = req.user
        let {id} = req.params
        let {limit} = req.query
        limit = limit || 3
         
      if (user) {

        let arr = []
        let arr2=[]
        const comments = await Comment.findAll({where: {workId:id}, limit, order: [['createdAt','DESC']]})
        comments.forEach(o=>arr.push(o.id))
        const like = await Likes.findAll({where: {idWork:id, userId:user.id, 
            idCmnt:{[Op.or]:arr},
        }})
        like.forEach(g=>arr2.push(g.idCmnt))
        comments.forEach(f=>{
            for(let i=0;i<arr.length;i++) {
                if (arr2[i] === f.id) {
                    f.usLike = 'yes'
                }
            }
        })
        return res.json(comments)
    
    } else {
        const comments = await Comment.findAll({where: {workId:id}, limit, order: [['createdAt','DESC']]})
        res.status(200).json(comments)
    }
    }


    async del(req, res) {
        let {idCmnt} = req.query
        const comment = await Comment.findOne({where:{id:idCmnt}})
        const like = await Likes.findOne({where: {idCmnt}})
        const work = await Work.findOne({where:{id:comment.workId}})
        await comment.destroy()
        if (like) Likes.destroy({where: {idCmnt}})
        work.cmnt = work.cmnt - 1
        await work.save()
        res.status(204).json('коммент удален')
    }
}

export default new CommentController