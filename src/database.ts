
export class Database {

    Database ={};

    select(tabela:string):object{

    const data  = this.Database[tabela] ?? [];

    return data
    }

    insert(tabela:string, data:object):object {
        if(Array.isArray(this.Database[tabela])){
        // se sim, entra aqui
        this.Database[tabela].push(data)
        }
        else
        {
            //se não, entra aqui
        this.Database[tabela] = [data]
            
        }

        return data
    }
}