const express = require("express");
const routes = require("./routes");
const mongoose =  require('mongoose')


const server = express()

// connection database
mongoose.connect('mongodb://oministack8:oministack8@ds261567.mlab.com:61567/oministack_8')


server.use(routes);

server.listen(3333, () => {});
