import {db2} from './coreUI_server.js'

export const followChamp = async(req, res) => {
console.log(req.body.games, req.body.user, req.body.champion )

const champions = await db2.select('name').from('champions')
const championsArray = champions.map(champion => champion.name.toLowerCase())
const gamesArray = req.body.games.sort()

if (championsArray.includes(req.body.champion)){
    let follow = await db2('followedChampions')
    .insert({
    username:req.body.user,
    champion:req.body.champion,
    games:gamesArray
    }).then(status => res.send({
            status: 'ok',
            data: {
             username:req.body.user,
             champion:req.body.champion,
             games:req.body.games,
             message: 'Champion followed'
            }
        
    })).catch(err => err.detail)
}
else{res.send(
    {
        status: 'failed',
        data: {
            errorMessage: 'Champion not found'
        }
    }
)
}


}