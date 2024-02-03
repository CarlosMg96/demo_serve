const db = require('./db/connection');
const axios = require('axios');

const createClient = () => {
    axios.get('https://randomuser.me/api/')
        .then((response) => {
            const { name } = response.data.results[0];
            const sql = `INSERT INTO clients (name,last_name, created_at) VALUES ('${name.first}','${name.last}', '2024-02-01 19:07:41')`;
            db.query(sql, (err, result) => {
                if (err) throw err;
                console.log('Cliente creado!');
                /*const sql = `INSERT INTO logs (description, time_stamp) VALUES ('Cliente creado', NOW())`;
                db.query(sql, (err, result) => {
                    if (err) throw err;
                    console.log('Log creado!');
                });*/
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

const createPets = () => {
    const petsName = ["Juan", "Pulgoso", "Manchas", "Matias", "Zacarias", "Pulgas", "Pedro", "Alfonso", "Manuel", "Alejandro"];
    var numeroDecimal = Math.random();
    var numeroAleatorio = Math.floor(numeroDecimal * 9);

    axios.get('https://dogapi.dog/api/v2/breeds')
        .then((response) => {
            const responseData = response.data.data;
            let name_dog = "San Bernardo";

            // Convertir a un array si no es un array
            const dataArray = Array.isArray(responseData) ? responseData : Object.values(responseData);
            // Obtener el nombre de la raza de perro aleatoria
            const { name } = dataArray[numeroAleatorio];
            // const { name } = response.data.data[numeroAleatorio];
            console.log(name);
            const sql = `INSERT INTO pets (name,type,breed,owner_id, created_at) VALUES ('${petsName[numeroAleatorio]}','Dog','${name_dog}','${numeroAleatorio}', '2024-02-01 19:07:41')`;
            db.query(sql, (err, result) => {
                if (err) throw err;
                console.log('Mascota creada!');
                /*const sql = `INSERT INTO logs (description, time_stamp) VALUES ('Cliente creado', NOW())`;
                db.query(sql, (err, result) => {
                    if (err) throw err;
                    console.log('Log creado!');
                });*/
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

// setInterval(createClient,5000);

setInterval(createPets, 1000);