const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express(); //create express server
const port = process.env.PORT || 5000;

app.use(cors()); //cors middleware
app.use(express.json()); //allows us to parse json

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}); //connect to our mongo atlas cluster
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("Mongo DB connection established");
})

//const menuItemsRouter = require('./rotes/menuItems');
//app.use('/menuItems', menuItemsRouter); //if someone goes to /menuItems, they will see everything in the menuItemsRouter 
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);
const plantsRouter = require('./routes/plants');
app.use('/plants', plantsRouter);
const userPlantsRouter = require('./routes/userPlants');
app.use('/userPlants', userPlantsRouter);
const gardensRouter = require('./routes/gardens');
app.use('/gardens', gardensRouter);
const wateringScheduleRouter = require('./routes/wateringSchedules');
app.use('/ws', wateringScheduleRouter);
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
});