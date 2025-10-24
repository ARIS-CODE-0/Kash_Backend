const mongoose = require("mongoose");
require("dotenv").config();

//fonction qui gère la connection 

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("L'application est connectée à la base de donnée")
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports =  { connectDB }