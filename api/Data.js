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


    async getNutrients(limit, term) {

        let searchClause = '';
        if (term && term.length >= 2) {
            searchClause = `AND ${term.split(" ").map((subterm, i) => {
                let q = `(LOWER(tags) LIKE LOWER('%${subterm}%'))`;
                console.log(q)
                return q
            }).join(" OR ")} OR (LOWER(name) LIKE LOWER('%${term}%'))`
        }

        let query = `SELECT code,name,priority,tags FROM 'public.columns' where priority >= 0 ${searchClause} ORDER BY priority desc LIMIT ${limit}`;
        console.log(query)
        let data = await this.query(query)
        return data
    }



}
export default Database