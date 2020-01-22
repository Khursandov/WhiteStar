const express = require('express')
const port = process.env.PORT || 8080

const app = express()
app.use(express.static(__dirname, '/dist'))

//here we are configuring dist to serve app files
app.get(/.*/, function (req, res) {
	res.sendFile(__dirname + '/dist/index.html')
})

app.listen(port)
console.log(`app is listening on port: ${port}`)