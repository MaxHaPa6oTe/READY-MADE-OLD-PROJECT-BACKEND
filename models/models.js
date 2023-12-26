import _db from '../db.js'
import { DataTypes } from 'sequelize'

export const User = _db.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, allowNull: false, defaultValue: 'USER'},
    name: {type: DataTypes.STRING},
    years: {type: DataTypes.INTEGER},
    ava: {type: DataTypes.STRING}
})

export const Work = _db.define('work', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    text: {type: DataTypes.STRING, unique: true},
    img: {type: DataTypes.ARRAY(DataTypes.STRING)},
    likes: {type: DataTypes.INTEGER,defaultValue: 0},
    cmnt: {type: DataTypes.INTEGER,defaultValue: 0},
    usLike: {type: DataTypes.INTEGER},
})

export const Comment = _db.define('comment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING, allowNull: false},
    likes: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    avtor: {type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false},
    usLike: {type: DataTypes.INTEGER},
}) 

export const Likes = _db.define('like_user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    idCmnt: {type: DataTypes.INTEGER},
    idWork: {type: DataTypes.INTEGER},
})

// Work.hasMany(Comment)
// Comment.belongsTo(Work)   
      
//hasOne 1 к 1     
//belongsToMany много ко многим(нужно создать промежуточную таблицу)

User.hasMany(Comment)
Comment.belongsTo(User)

User.hasMany(Likes)
Likes.belongsTo(User)

Work.hasMany(Comment)
Comment.belongsTo(Work)