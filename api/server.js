/**
 * Demo des Test
 * Initiation de Express
 */

let express = require('express')
let app = express()


/**
 * Modules de Securité d'une API (logs, XSS securité etc...)
 */
let cors = require('cors');
let bodyParser = require('body-parser');
let helmet = require('helmet');
let path = require('path');
let Table = require('./model/Table')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());



/**
 *  C'est ma clef pour Youtube API V3
 * https://console.developers.google.com/apis/dashboard?
 * You should use
 */

const apiYoutubeKey = "AIzaSyCWO4Gl7Hgl58HxFy0ehAwkSU673xH5UDY";

/**
 * Module RethinkDb
 */
let r = require('rethinkdb');

/**
 * Erreur 500 sortie en JSON
 */
app.use(function (error, request, response, next) {
    response.status(error.status || 500);
    response.json({ error: error.message });
});


/**
 * Connection with RethinkDB
 */
let connection = r.connect({
    db: "test" //your database
}).then((connection) => { // une fois qu'il a effectuer une connexion


    app.get('/', (req, res) => {

    });



});





app.listen(3000, function () {
    console.log('Listened on port 3000!')
});
