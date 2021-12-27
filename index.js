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

app.get('/movies/add', (req, res) => {
    res.send()
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
app.get('/movies/edit', (req, res) => {
    res.send()
})
app.get('/movies/delete', (req, res) => {
    res.send()
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})