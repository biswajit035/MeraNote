const path = require("path");
const express = require('express')
var cors = require('cors')
const connectToMongo = require('./db')
require('dotenv').config();

const app = express()
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(cors())
let port = process.env.PORT || 8000;

app.use(express.json())


//available routes
app.get('/',function (req,res){res.send("checking backend")})
app.use('/api/auth', require('./Routes/auth'))
app.use('/api/notes', require('./Routes/notes'))

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
    res.sendFile(
        path.join(__dirname, "./client/build/index.html"),
        function (err) {
            res.status(500).send(err);
        }
    );
});
connectToMongo().then(()=>{
    app.listen(port, () => {
        console.log(`http://localhost:${port}/`)
    })
})
