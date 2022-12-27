const mongoose = require('mongoose');
require('dotenv').config();

const connectToMongo=async()=>{
    try {
        // if (process.env.DB == null) {
        //     mongoURI = "mongodb://127.0.0.1:27017";
        // }
        // // Use this instead if running the dockerfile
        // else {
        //     mongoURI = "mongodb://mongodb:27017"
        // }
        await mongoose.connect(`mongodb+srv://${process.env.DATABASE_ID}:${process.env.DATABASE_PASS}@cluster0.4m23f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useNewUrlParser: true});
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = connectToMongo;