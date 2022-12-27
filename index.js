const path = require("path");
const express = require('express')
var cors = require('cors')
const connectToMongo = require('./db')

const app = express()
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(cors())
let port = process.env.PORT || 8000;
connectToMongo();
app.use(express.json())


//available routes
app.get('/',function (req,res){res.send("hellow brother")})
app.get('/kolkata',function (req,res){res.send(process.env.NODE_ENV)})
app.get('/city', function (req, res) { res.send(process.env.DATABASE_PASS)})
app.use('/api/auth', require('./Routes/auth'))
app.use('/api/notes', require('./Routes/notes'))

if (process.env.NODE_ENV === "production") {
    app.use(express.static("build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "build", "index.html"));
    });
}

app.listen(port, () => {
    console.log(`http://localhost:${port}/`)
})