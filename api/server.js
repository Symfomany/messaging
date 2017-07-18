/**
 * Demo des Test
 * Initiation de Express
 */

let express = require('express')
let app = express()


/**
 * Socket.IO
 */
let server = require('http').Server(app);
let io = require('socket.io')(server);
server.listen(4050);


/**
 * Modules de Securité d'une API (logs, XSS securité etc...)
 */
let cors = require('cors');
let bodyParser = require('body-parser');
let helmet = require('helmet');
let path = require('path');
let YouTube = require('youtube-node');
let Twitter = require('twitter');


let clientTwitter = new Twitter({
    consumer_key: 'Go042VQzGV8Nq2pGQnw5FtXe9',
    consumer_secret: 'TPoVKuGV200Kd1ZZ8RpzEgje7bWTqJxthUpeBJtdlFIGfWQHws',
    access_token_key: '885009123489853440-F8kZRZ1oJV9iW7Z3hSzFb0Rm6OeMIlw',
    access_token_secret: 'OWZbiSBFvOoTebW1UzdawlPehcmj88KZdWT8YzDEHpXHM'
});


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
        youTube.search('Angular', limit, (error, result) => {
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

        youTube.search('Angular', limit, (error, result) => {
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
        youTube.getById(id, (error, result) => {
            if (error) {
                console.log(error);
            }
            else {
                res.json(result);
            }
        });
    });

    app.get('/related/:id', (req, res) => {
        let id = req.params.id;
        youTube.related(id, 2, (error, result) => {
            if (error) {
                console.log(error);
            }
            else {
                res.json(result);
            }
        });
    });

    app.get('/search/:content?', (req, res) => {
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

    app.get('/comments/:id', (req, res) => {
        let id = req.params.id;
        r.db('youtube').table('comment').filter({ 'vid': id }).run(connection, (err, cursor) => {
            cursor.toArray((err, tab) => {
                return res.json(tab)
            });
        })
    });

    app.get('/already/:id', (req, res) => {
        let id = req.params.id;
        r.db('youtube').table('like').filter({ 'id': id }).isEmpty().run(connection, (err, response) => {
            res.json(response);
        })
    });

    app.get('/tweets', (req, res) => {
        clientTwitter.get('statuses/home_timeline', function (error, tweets, response) {
            if (error) throw error;
            res.json(tweets);
        });
    });

    app.post('/addcomments', (req, res) => {
        r.db('youtube').table('comment').insert(req.body, { returnChanges: true }).run(connection, (err, response) => {
            res.json(response.changes[0].new_val);
        })
    });

    app.post('/removecomments', (req, res) => {
        r.db('youtube').table('comment').get(req.body.id).delete().run(connection, (err, response) => {
            res.json(true);
        })
    });


    /**
     * Realtime Routing
     */
    io.on('connection', (socket) => {
        app.post('/like', (req, res) => {

            let status = `${req.body.title} . Video: https://www.youtube.com/watch?v=${req.body.id}`;
            clientTwitter.post('statuses/update', { status: status }, function (error, tweet, response) {
                if (error) throw error;
            });

            r.db('youtube').table('like').insert(req.body).run(connection, (err, response) => {
                socket.broadcast.emit('liked', req.body.title);
                res.json(true);
            })
        });
    });


    app.post('/dislike', (req, res) => {
        r.db('youtube').table('like').get(req.body.id).delete().run(connection, (err, response) => {
            res.json(true);
        })
    });


    app.get('/likes', (req, res) => {
        r.db('youtube').table('like').run(connection, (err, cursor) => {
            cursor.toArray((err, tab) => {
                return res.json(tab)
            });
        })
    });

});



app.listen(3000, function () {
    console.log('Listened on port 3000!')
});
