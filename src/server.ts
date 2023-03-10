import express, { Router, response } from 'express'
import { request } from 'http';
import { Database } from './database';

    const app = express()

    const port = 3000

    app.use(express.json())

    const database = new Database   

    var dados:string[] = []

    app.get ('/', (request, response ) => {
        const user = database.select("user");
        response.json(user)

        //Parametro que está vindo do cliente - request
        //Parametro que está indo para o cliente - response
    });    

     app.post('/', (request, response) => {

        const {name, email} = request.body;

        const user  = {
            id : "1",
            name: name,
            email,
        };

        database.insert('user', user);

        response.status(201).send();

     });

    app.listen(port, () => {
        console.log (`Server Running! <3, end: http://localhost:${port}`);

    })


    