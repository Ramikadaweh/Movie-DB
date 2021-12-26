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
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})