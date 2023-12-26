import { Work, Likes } from "../models/models.js"
import * as uuid from 'uuid'

class workController {
    async add(req, res) {
        try {
        const {title, text} = req.body
        const {img} = req.files
        let imgArr = []
        for (let i=0;i<img.length;i++) {
            let fileName = uuid.v4() + '.jpg'
            imgArr.push(fileName)
            img[i].mv('./static/' + fileName)
        }
        const work = await Work.create({title, text, img: imgArr})
        return res.status(201).json('пост создан')
        // img.mv('./static/' + fileName)
        // const work = await Work.create({title, text, img: fileName})
        // return res.status(201).json("пост создан")
        // return res.status(201).json(img.length)
    } catch (err) {
            return res.status(400).json("не удалось создать пост")
        }
    }


    async all(req, res) {
        const user = req.user
        
      if (user) {

        let arr = []
        let arr2=[]
        const works = await Work.findAll({order: ['createdAt']})
        works.forEach(o=>arr.push(o.id))
        const like = await Likes.findAll({where: {userId:user.id, 
            idCmnt:null},
        })
        like.forEach(g=>arr2.push(g.idWork))
        works.forEach(f=>{
            for(let i=0;i<arr.length;i++) {
                if (arr2[i] === f.id) {
                    f.usLike = 'yes'
                }
            }
        })
        return res.json(works)
    
    } else {
        const works = await Work.findAll({order: ['createdAt']})
        res.status(200).json(works)
    }
    }


    async getOne(req, res) {
        const {id} = req.params
        const user = req.user
        
      if (user) {

        const work = await Work.findOne({where: {id:id}})
        const like = await Likes.findAll({where: {userId:user.id, 
            idCmnt:null,idWork:id},
        })
        if (like.length!==0) {
            work.usLike='yes'
        return res.json(work)
        }else return res.json(work)
    } else {
        const work = await Work.findOne({where: {id:id},})
        return res.status(200).json(work)
    }
    }


    // async delete(req, res) {
    //     const {id} = req.params
    //     const work = await Work.findOne({where: {id:id}})
    //     await work.destroy()
    // }
}

export default new workController