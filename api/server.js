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
let YouTube = require('youtube-node');

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

const youTube = new YouTube();

youTube.setKey(apiYoutubeKey);

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

    let limit = 8;

    app.get('/', (req, res) => {
        youTube.search('Angular', limit, function (error, result) {
            if (error) {
                console.log(error);
            }
            else {
                res.json(result)
            }
        });
    });


    app.get('/more', (req, res) => {
        limit += 8;

        youTube.search('Angular', limit, function (error, result) {
            if (error) {
                console.log(error);
            }
            else {
                res.json(result)
            }
        });
    });

    app.get('/detail/:id', (req, res) => {
        let id = req.params.id;
        youTube.getById(id, function (error, result) {
            if (error) {
                console.log(error);
            }
            else {
                res.json(result);
            }
        });
    });

    app.get('/search/:content', (req, res) => {
        let content = req.params.content;

        youTube.search(content, 8, function (error, result) {
            if (error) {
                console.log(error);
            }
            else {
                res.json(result)
            }
        });
    });



    app.post('/like', (req, res) => {
        r.table('youtube').insert(req.body).run((res) => {

        })
    });


});





app.listen(3000, function () {
    console.log('Listened on port 3000!')
});
