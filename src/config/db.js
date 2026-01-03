const mongoose = require("mongoose");
require("dotenv").config();

//fonction qui gère la connection 
let isConnected = false;

async function connectDB() {
    if(isConnected) return;

    await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
    });

    isConnected = true
}

module.exports =  { connectDB }