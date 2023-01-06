import bcrypt from 'bcryptjs'
import {db} from './database/connectionDB.js'

export const userRegistration = async(req, res) => {
    const SECURE = await bcrypt.hash(req.body.password, 10);
    await db('usersprivate')
    .insert({
    email:req.body.eMail,
    password:SECURE,
    })

    await db('UserAuth')
    .insert({
    username:req.body.username,
    email: req.body.eMail,
    })

    console.log('working')
} 