const mongoose = require("mongoose");
const mongooURI = "mongodb://0.0.0.0:27017/";

// Connection to Database
const connectToMongo = async () => {
    await mongoose.connect(mongooURI);
    console.log('success')
} 
module.exports = connectToMongo;

