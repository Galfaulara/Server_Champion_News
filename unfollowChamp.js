import {db2} from './coreUI_server.js'

export const unfollowChamp = async(req, res) => {
let champToUnfollow = (req.params.championName).toLowerCase()
console.log(champToUnfollow)
await db2('followedChampions').where('champion','=',champToUnfollow).del()
}