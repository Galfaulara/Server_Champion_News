import {db, db2} from '../connectionDB.js'

export const allChampionsName = async() =>
{
return await db2.select('name').from('champions')
} 

export const getChampsTable = async() =>
{
return await db2.select('name','title','champ_id','blurb').from('champions');
}