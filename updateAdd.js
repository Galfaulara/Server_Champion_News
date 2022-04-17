import {db2} from './coreUI_server.js'

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