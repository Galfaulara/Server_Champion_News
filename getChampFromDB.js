import {db2} from './Server_championNews'

const champNames = await db2.select('name','title','champ_id','blurb').from('champions');

export const getChampFromDB = async(req, res) =>{
      

     const toInsert = await req.body.flatMap((champion) => 
        champNames.some(dataElement => dataElement.name === champion.name) ? [] : champion)

        toInsert.flatMap( async (champion) => {
            await db2('champions').insert({
            name: champion.name,
            title: champion.title,
            champ_id: champion.id,
            blurb: champion.blurb
            })
        }
        )           
}