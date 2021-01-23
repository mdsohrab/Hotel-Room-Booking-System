const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bookingsRoute = require('./routes/bookings');
const availabilityRoute = require('./routes/checkAvailability');
const roomRoute = require('./routes/rooms');
const bodyParser = require('body-parser');
require('dotenv/config')

//MIDDLEWARES
app.use(bodyParser.json());
app.use('/bookings', bookingsRoute);
app.use('/checkAvailability', availabilityRoute);
app.use('/make_new_room', roomRoute);

//Routes
app.get('/',(req,res)=>{
    res.send('Welcome to Your Home!')
})

//CONNECT TO THE DATABASE
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true },()=>{
        console.log('DB connected')
    }
)

app.listen(3000);