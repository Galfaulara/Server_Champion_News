import anymatch from 'anymatch'
import {db2} from './coreUI_server.js'

export const updateEliminate = async(req, res) => {
let champion = (req.body.champion).toLowerCase()
let game = req.body.game
const toEliminate = await db2.select('*').from("followedChampions").whereRaw('champion = ?', champion)
let updatedArray = (toEliminate[0].games)
let indexElim = ((toEliminate[0]).games.indexOf(game)) 
await (updatedArray.splice(indexElim,1))
await db2('followedChampions').where('champion','=',champion).update({games: updatedArray},)
}