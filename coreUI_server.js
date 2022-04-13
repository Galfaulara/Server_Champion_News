import { Insertion } from './Insertion.js';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import express from 'express';
import { followChamp } from './followChamp.js';
import knex from 'knex';
import { unfollowChamp } from './unfollowChamp.js';

const app = express();

app.use(cors())
app.use(express.json())

export const db = knex({
    client: 'pg',
    connection: {
    host : '127.0.0.1',
    port: '5432',
    user : 'postgres',
    password : 'postgres4494',
    database : 'postgres'
    }
});
export const db2 = knex({
    client: 'pg',
    connection: {
    host : '127.0.0.1',
    port: '5432',
    user : 'postgres',
    password : 'postgres4494',
    database : 'loreDatabase'
    }
});
  

app.listen(3000, async ()=>

{
    console.log("Running")
    const toAuthenticate = 
    await db.select('*')
    .from('UserAuth');
    console.log(toAuthenticate)
})

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
            passwordValidate = await bcrypt.compare(enteredPassword, TESTO[0].password)
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

app.delete('/champions/delete/:championName', async(req, res) => {
console.log('To delete: ', req.params.championName)
    try{
        unfollowChamp(req, res)
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