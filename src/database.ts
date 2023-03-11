import fs from "node:fs/promises"

const databasePath = new URL('../db.json', import.meta.url)
export class Database {

    #database:any ={};


    constructor(){
        fs.readFile(databasePath, 'utf8')
        .then(data =>{this.#database = JSON.parse(data)
        }).catch((() => {
            this.#persist()
        }));
    }

    #persist() {
        fs.writeFile(databasePath,JSON.stringify(this.#database, null, 2))
    }

    select(tabela:string):object{

    const data  = this.#database[tabela] ?? [];

    return data
    }

    insert(tabela:string, data:object):object {
        if(Array.isArray(this.#database[tabela])){
        // se sim, entra aqui.
        this.#database[tabela].push(data);
        this.#persist()
        }
        else
        {
            //se não, entra aqui
        this.#database[tabela] = [data]
            
        }

        return data
    }

    delete(table:string, id:string){
        const rowIndex = this.#database[table].findIndex((row) => row.id == id)

        if (rowIndex > -1 ){
            this.#database[table].splice(rowIndex, 1);
            this.#persist();
        }
    }

}