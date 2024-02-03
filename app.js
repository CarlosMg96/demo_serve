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
    const animalTypes = ["Dog", "Cat", "Bird", "Fish", "Hamster", "Turtle", "Rabbit", "Guinea Pig", "Snake", "Lizard"];
    
    const numeroDecimal = Math.random();
    const numeroAleatorio = Math.floor(numeroDecimal * 9);

    const randomPetName = petsName[numeroAleatorio];
    const randomAnimalType = animalTypes[Math.floor(Math.random() * animalTypes.length)];
    
    let randomBreed;

    switch (randomAnimalType) {
        case "Dog":
            const dogBreeds = ["San Bernardo", "Labrador", "Poodle", "Bulldog", "Chihuahua"];
            randomBreed = dogBreeds[Math.floor(Math.random() * dogBreeds.length)];
            break;
        case "Cat":
            const catBreeds = ["Siamese", "Persian", "Maine Coon", "Bengal", "Sphynx"];
            randomBreed = catBreeds[Math.floor(Math.random() * catBreeds.length)];
            break;
        default:
            randomBreed = "Unknown";
    }

    const sql = `INSERT INTO pets (name, type, breed, owner_id, created_at) VALUES ('${randomPetName}', '${randomAnimalType}', '${randomBreed}', '${numeroAleatorio}', '2024-02-01 19:07:41')`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log('Mascota creada!');
    });
}


setInterval(createClient,5000);

setInterval(createPets, 4000);