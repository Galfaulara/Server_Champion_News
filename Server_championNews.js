import {db, db2} from './connectionDB.js'
import { followChamp, unfollowChamp, updateAdd, updateEliminate } from '.services/championServices.js';

import { Insertion } from './Insertion.js';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors())
app.use(express.json())
  

app.listen(3000, async ()=>

{
    console.log("Running")
    const toAuthenticate = 
    await db.select('*')
    .from('UserAuth');
    console.log(toAuthenticate)
})

app.post('/', (req, res)=>{

    getChampFromDB(req,res)
    res.end('Post process finished')
   
    }
)

app.post('/login', async(req, res) =>{
    try{
        const enteredUsername = await req.body.username;
        const enteredPassword = await req.body.password;
        let passwordValidate = false;
    
        const logIn = await db('UserAuth')
        .join('usersprivate','UserAuth.email','=', 'usersprivate.email')
        .select('*')
        .where('UserAuth.email','=',enteredUsername)
        if(logIn.length != 0 ){
            passwordValidate = await bcrypt.compare(enteredPassword, logIn[0].password)
        }
        else{
            console.log('No username found')
        }
        res.send({
            status: 'ok',
            data: {
                username: enteredUsername,
                authentication: passwordValidate,
            }
        })
        console.log('Trynna login as:',req.body.username, req.body.password)
        console.log(logIn)
    }
catch(error){
    res.send({
        status: 'failed',
        data: {
            username: 'n/a',
            authentication: false,
            message: error
        }
    })
    console.log(error)

}
    }
    
)

app.post('/register', async(req, res) =>{
    
    Insertion(req, res).then(status => res.send(200)).catch(err => res.send(err.detail))

    console.log('Trynna register as:',req.body.username)
    
}
)

app.post('/champions/follow', async(req, res) =>{
    try{
        followChamp(req, res)
    }
    
catch(error){
    res.send({
        status: 'failed',
        data: {
            username:req.body.user,
            champion:req.body.champion,
            games:req.body.games,
            message: error
        }
    })

}

    
    
}
)

app.get('/champions/get', async(req, res) =>{
const followedChampionsData = await db2.select('*').from('followedChampions')
res.send(followedChampionsData)
})

app.put('/champions/updateEliminate', async(req, res) =>{
        try{
            updateEliminate(req, res).then(res.send({
                status: 'success',
                data: {
                    champion:req.body.champion,
                    game:req.body.game
            }
            }))
        }
    
        catch(error){
            res.send({
                status: 'failed',
                data: {
                    champion:req.body.champion,
                    message: error
                }
            })

        }

    })

    app.put('/champions/updateAdd', async(req, res) =>{
            try{
                updateAdd(req, res).then(res.send({
                    status: 'success',
                    data: {
                        champion:req.body.champion,
                        game:req.body.game
                }
                }))
            }
        
            catch(error){
                res.send({
                    status: 'failed',
                    data: {
                        champion:req.body.champion,
                        message: error
                    }
                })

            }
        }) 


app.delete('/champions/delete/:championName', async(req, res) => {
console.log('To delete: ', req.params.championName)
    try{
        unfollowChamp(req, res).then(res.send({
            status: 'success',
            data: {
                champion:req.body.champion,
                message:'Champion eliminated'
        }
        }))
    }
    
catch(error){
    res.send({
        status: 'failed',
        data: {
            champion:req.body.champion,
            message: error
        }
    })

}

})