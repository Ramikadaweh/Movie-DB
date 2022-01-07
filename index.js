var express = require("express");
var app = express();
var port = 8000;
app.listen(port, () => {
    console.log("Server listening on port " + port);
});

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
const dbe = require('./config/db');
mongoose.connect(dbe.url);

var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connectionasdf error:'));
 
db.once('open', function() {
  console.log("Successfully connected to MongoDB!");
});


const nameSchema = new mongoose.Schema({
    movies: [{title: String,
    year: Number,
    rating:Number}]
});
const moviedb = mongoose.model("movie", nameSchema);

var hour = new Date().getHours();
var second = new Date().getSeconds();
const time = { status:200, message:hour+':'+second };

const movie=new moviedb({
    movies : [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
    ]
    
})
    
 
app.get("/", (req, res) => {
res.send("Hello World");
});

app.get("/test", (req, res) => {
    res.send({status:200, message:"ok"});
});

app.get("/time", (req, res) => {
    res.send(time);
});

app.get('/hello/:id', (req, res) => {
    res.send({
    status:200, message:`hello,${req.params.id}` })
});

app.get('/search', (req, res) => {
    const {s}=req.query;
    s ?
    res.send({
    status: 200, message: "ok", data: s 
    }) : res.status(500).json({ status: 500, error: true, message: "you have to provide a search" });
});

app.get('/movies/get', (req, res) => {
    res.send({status:200, data:movie.movies})
    
});

app.post('/movies/add', (req, res) => {
    const title=req.query.title;
    const year=req.query.year;
    const rating=Number(req.query.rating) ? Number(req.query.rating) : 4;
    
    if(title && year && Number(year) && year.length==4){
        movie.movies.push({ 'title': title, 'year': Number(year), 'rating': rating });
        movie.save({}, (error, result) => {
            if (error) console.log('error saving!!!')
            console.log('movie added')
        })
        res.send({title,year,rating});
    }
    else{console.log("{ status: 403, error: true, message: 'you cannot create a movie without providing a title and a year' }") }
    
    
});

app.put('/movies/edit/:id', (req, res) => {
    ed=req.params.id;
    ti=req.query.title;
    ra=Number(req.query.rating);
    
    if(ed <= movie.movies.length && ti) {
    movie.movies[ed].title = ti;
    res.send('movie '+ed+' edited');
    movie.save({}, (error, result) => {
        if (error) console.log('error saving!!!')
        console.log('saved')
    });
    }
    if (ed <= movie.movies.length && ti && ra) {
    movie.movies[ed].title = ti;
    movie.movies[ed].rating = ra;
    movie.save({}, (error, result) => {
        if (error) console.log('error saving!!!')
        console.log('saved')
    });
    console.log('movie '+ed+' edited');
    } 
    if(ed > movie.movies.length) {
    console.log('{status:404, error:true, message:the movie '+ed+' does not exist}')
    }
   
})

app.delete('/movies/delete/:id', (req, res) => {
    de=req.params.id;
    de <= movie.movies.length ?
    movie.movies.splice(de, 1) &
    movie.save({}, (error, result) => {
        if (error) console.log('error saving!!!')
        console.log('movie saved')
    }) &
    res.send('the movie '+de+' deleted') :
    console.log('does not exist')
    
});
    
    

 
