import * as dotenv from 'dotenv'

import knex from 'knex';

//For knex, dotenv must be imported in the same file as the knex import


dotenv.config()

const {SERVER_HOST, 
    SERVER_PORT, 
    SERVER_USER, 
    SERVER_PASSWORD, 
    SERVER_DATABASE1,
    SERVER_DATABASE2} = process.env

    
export const db = knex({
    client: 'pg',
    connection: {
        host : SERVER_HOST,
        port: SERVER_PORT,
        user : SERVER_USER,
        password : SERVER_PASSWORD,
        database : SERVER_DATABASE1
    }
});
export const db2 = knex({
    client: 'pg',
    connection: {
        host : SERVER_HOST,
        port: SERVER_PORT,
        user : SERVER_USER,
        password : process.env.SERVER_PASSWORD,
        database : SERVER_DATABASE2
    }
});