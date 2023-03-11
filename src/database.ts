import fs from "node:fs/promises"
import { json } from "stream/consumers";

const databasePath = new URL('../db.json', import.meta.url)
export class Database {

    #database:any ={};


    constructor(){
        fs.readFile(databasePath, 'utf8')
        .then(data =>{this.#database = JSON.parse(data)
        }).catch((() => {
            this.#persist
        }));
    }

    #persist() {
        fs.writeFile(databasePath,JSON.stringify(this.#database))
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
}