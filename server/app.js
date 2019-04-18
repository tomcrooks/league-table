const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/movieData';
const mongodb = new MongoClient(url, { useNewUrlParser: true });

const exports = module.exports = {}

exports.getShows = (db) => {
    try {
        mongodb.connect(async err => {
            if (!err) console.log("Connected successfully to server");
            const db = mongodb.db();
            let shows = await getShows(db);  
            const randomShow = await pickRandom(shows, 'Romance');
            console.log(`We have selected the show, ${randomShow.name} at random for you to watch.`) 
        });
    
    } catch(e) {
        if (e) console.log(e);
    }

    return new Promise((resolve, reject) => {
        db.collection('shows').find({ "rating.average" : { $gt : 8 }})
            .toArray()
            .then(resolve)
            .catch(reject)
    });
};

exports.pickRandom = (shows, genre) => {
    if (genre) shows = shows.filter(show => show.genres.includes(genre) )
    return shows[Math.floor(Math.random() * shows.length)];
}

