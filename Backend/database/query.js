import { error } from 'console'
import {} from 'dotenv/config'
import mysql from 'mysql'
import  util from 'util'

const databaseConfig = {
    host     : process.env.DB_HOST,
    port     :process.env.DB_PORT,
    user     : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
}

export default class Query{
    
    #connect(){
        this.conn = mysql.createConnection(databaseConfig)
        this.query = util.promisify(this.conn.query).bind(this.conn)
        this.conn.connect()
    }

    #disconect(){
        this.conn.end()
    }

    async execute(sql){
        try{

            this.#connect()
            return JSON.stringify(await this.query(sql))

        }catch(err){

            console.log('Erro na conexao: ')
            console.log(err)

            throw {
                "error": err.sqlMessage,
                "sql": err.sql
            }

        }finally{

            this.#disconect()

        }
    }
}