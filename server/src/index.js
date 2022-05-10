require("dotenv").config();

const dbConnection = require("./database");
const app = require("./app");


dbConnection();

const server = app.listen(process.env.SERVER_PORT, () => {
    console.log("Backend server is running...");
});


module.exports = server;