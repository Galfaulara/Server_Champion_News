import {db2} from './Server_championNews.js'

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

export const unfollowChamp = async(req, res) => {
let champToUnfollow = (req.params.championName).toLowerCase()
console.log(champToUnfollow)
await db2('followedChampions').where('champion','=',champToUnfollow).del()
}

export const updateAdd = async(req, res) => {
    console.log('updateAdd')
    let champion = (req.body.champion).toLowerCase()
    let game = req.body.game
    const toAdd = await db2.select('*').from("followedChampions").whereRaw('champion = ?', champion)
    toAdd[0].games.push(game)
    const sortAdd = (toAdd[0].games).sort()
    console.log(toAdd)
    await db2('followedChampions').where('champion','=',champion).update({games: sortAdd})
}

export const updateEliminate = async(req, res) => {
    let champion = (req.body.champion).toLowerCase()
    let game = req.body.game
    const toEliminate = await db2.select('*').from("followedChampions").whereRaw('champion = ?', champion)
    let updatedArray = (toEliminate[0].games)
    let indexElim = ((toEliminate[0]).games.indexOf(game)) 
    await (updatedArray.splice(indexElim,1)).sort()
    await db2('followedChampions').where('champion','=',champion).update({games: updatedArray},)
}