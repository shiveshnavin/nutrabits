import axios from 'axios'

class Database {
    isLocal = false;
    constructor(isLocal) {
        this.isLocal = isLocal;
    }

    async query(sql) {
        if (!this.isLocal) {
            let result = await axios.post("https://nutrabits.herokuapp.com/public", {
                "transaction": [
                    {
                        "query": sql
                    }
                ]
            })
            return result.data.results[0].resultSet
        }
        return []
    }


    async getNutrients(limit) {

        let data = await this.query(`SELECT code,name,priority,tags FROM 'public.columns' where priority >= 0 ORDER BY priority desc LIMIT ${limit}`)
        return data
    }



}
export default Database