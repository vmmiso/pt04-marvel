const mongoose = require("mongoose");


const dbConnection = async () => {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        };
        await mongoose.connect(
            process.env.MONGO_URL,
            connectionParams
        );
        console.log("Connected to database.");
    } catch (error) {
        console.log("ERROR: Could not connect to database.", error);
    }
};


module.exports = dbConnection;