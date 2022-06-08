const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 4500;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("MongoDB Connection is Done");
})

const researchplususer = require('./routes/researchplususer.js');
const authRoutes = require('./routes/auth');
const webRouter = require("./routes/Web.js");

const group = require('./routes/groups')
const topic = require('./routes/topic')

app.use("/user",researchplususer);
app.use("/auth", authRoutes);
app.use("/groups",group);

app.use("/topic",topic);

app.use("/web", webRouter);




app.listen(PORT, ()=>{
    console.log(`Server is Running on port ${PORT}`);
})
