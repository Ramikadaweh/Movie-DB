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

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})