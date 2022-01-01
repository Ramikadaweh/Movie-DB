const express = require('express')
const app = express()
const port = 3000

var hour = new Date().getHours();
var second = new Date().getSeconds();
const test = {
    status:200, message:"ok"
};
const time = {
    status:200, message:hour+':'+second
};
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]


app.get('/', (req, res) => {
  res.send('ok')
})

app.get('/test', (req, res) => {
    res.send(test)
})

app.get('/time', (req, res) => {
    res.send(time)
})

app.get('/hello/:id', (req, res) => {
    res.send({
        status:200, message:`hello,${req.params.id}`
    })
})

app.get('/search', (req, res) => {
    const {s}=req.query;
    s ?
    res.send({
        status: 200, message: "ok", data: s 
    }) : res.status(500).json({ status: 500, error: true, message: "you have to provide a search" });
})

app.post('/movies/add', (req, res) => {
    const title=req.query.title;
    const year=req.query.year;
    const rating=Number(req.query.rating) ? Number(req.query.rating) : 4;

    (title && year && Number(year) && year.length==4) ?
    movies.push({ 'title': title, 'year': Number(year), 'rating': rating }) &
    res.send({title,year,rating}) :
    res.send({ status: 403, error: true, message: 'you cannot create a movie without providing a title and a year' }) 
})
app.get('/movies/get', (req, res) => {
    res.send({status:200, data:movies})
})
app.get('/movies/get/by-date', (req, res) => {
    res.send({status:200, data:movies.sort(function(a, b){return a.year - b.year}),})
})
app.get('/movies/get/by-rating', (req, res) => {
    res.send({status:200, data:movies.sort(function(a, b){return b.rating - a.rating}),})
})
app.get('/movies/get/by-title', (req, res) => {
    res.send({status:200, data:movies.sort(function(a, b){return a.title - b.title}),})
})
app.get('/movies/get/id/:id', (req, res) => {  
    req.params.id <= movies.length ?
    res.send({ status: 200, data: movies[req.params.id - 1] }) :
    res.status(404).json({ status: 404, error: true, message: `the movie ${req.params.id} does not exist` }) 
})
app.put('/movies/edit/:id', (req, res) => {
    ed=req.params.id;
    ti=req.query.title;
    ra=Number(req.query.rating);

    if(ed <= movies.length && ti) {
        movies[ed].title = ti;
        res.send('movie '+ed+' edited');
    }
    if (ed <= movies.length && ti && ra) {
        movies[ed].title = ti;
        movies[ed].rating = ra;
        res.send('movie '+ed+' edited');
    } 
    else {
        res.send('{status:404, error:true, message:the movie '+ed+' does not exist}')
    }
    
})
app.delete('/movies/delete/:id', (req, res) => {
    de=req.params.id;
    de <= movies.length ?
    movies.splice(de, 1) &
    res.send('the movie '+de+' deleted') :
    res.send('{status:404, error:true, message:the movie '+de+' does not exist}')
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})