import Query from '../../database/query.js'

export class UserRepository {
  async testeConnection(){
    const query = new Query
    const result = await query.execute('SELECT * FROM USERS')
    console.log(result)
  }

  async find(id){
    const query = new Query

    return await query.execute(`SELECT E.* FROM USERS E WHERE E.ID_USER = ${id}`)    
  }
}