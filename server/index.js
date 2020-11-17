// requiring depedencies.
const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//load the environment variable
dotenv.config();

//Create a server
const app = express();
const server = http.createServer(app);

app.use(express.json())
app.use(cors());

//Listening to the port
const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> console.log(`Server has started on port ${PORT}`));

//Connecting to the database
const URI = process.env.ATLAS_URI;
mongoose.connect(URI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})