const express = require('express');
const router = express.Router();
const Booking = require('../models/Bookings');
const Room = require('../models/Rooms');

//GET ROOMS AVAILABLE FOR A CERTAIN PERIOD
//Room       <______________>              <________>      Bookings already made for the room.
//Period1                      <_______>                   Available!! :)
//Period2              <_______>                           Unavailable :(
//Period3                            <_______>             Unavailable :(
//Period4               <_____________________>            Unavailable :(
router.get('/:from/:to', async (req,res)=>{
    try{
        // Step1: get distinct room nos. that are booked in the given date range from the database
        const bookedRooms = await Booking.find({
            $or: [
             { $and: [ { checkin: {$lt : req.params.to} }, { checkin : {$gt: req.params.from} } ] },
             { $and: [ { checkout: {$lt : req.params.to} }, { checkout: {$gt: req.params.from} } ] }
            ]
        }, {roomNo:1, _id:0}).distinct("roomNo");             //mysql equivalent query: select roomNo from bookings where (checkin>from and checkin<to) or (checkout>from and checkout<to)
        
        // Step2: get all the roomNos of the hotel
        const rooms = await Room.find({},{roomNo:1, _id:0}).distinct("roomNo"); //.distict is done only to convert the output in array format
        
        // Step3: Filter the rooms that are not in the list of rooms that are unavailable (or booked) in the given period
        const availableRooms = rooms.filter(function(x) { return bookedRooms.indexOf(x) < 0 }); //get rooms that are not booked
        
        console.log(rooms);
        console.log(bookedRooms);
        console.log(availableRooms);
        res.json({"Available Rooms":availableRooms});
    }catch(err){
        res.json({message:err});
    }
});

//GET ALL THE BOOKING DETAILS FOR ALL ROOMS
router.get('/', async (req,res)=>{
    const bookings = await Booking.find();
    res.json(bookings);
});

module.exports = router;