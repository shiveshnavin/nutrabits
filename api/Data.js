import axios from 'axios'

class Database {
    isLocal = false;
    constructor(isLocal) {
        this.isLocal = isLocal;
        let image = 'https://cdn.jsdelivr.net/npm/@ifct2017/pictures/assets/E001.jpeg'
    }
    async query(sql) {
        let result = await axios.post("https://xpaste.el.r.appspot.com/sqlite/query", {
            "transaction": [
                {
                    "query": sql
                }
            ]
        })
        console.log(result.data)
        return result.data.results[0].resultSet
    }

    async getNutrients(limit, term) {

        let searchClause = '';
        if (term && term.length >= 2) {
            searchClause = `AND ${term.split(" ").map((subterm, i) => {
                let q = `(LOWER(tags) LIKE LOWER('%${subterm}%'))`;
                return q
            }).join(" OR ")} OR (LOWER(name) LIKE LOWER('%${term}%'))`
        }

        let query = `SELECT code,name,priority,tags FROM 'public.columns' where priority >= 0 ${searchClause} ORDER BY priority desc LIMIT ${limit}`;
        let data = await this.query(query)

        return data
    }



}
export default Database