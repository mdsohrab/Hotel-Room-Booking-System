const express = require('express');
const router = express.Router();
const Booking = require('../models/Bookings');

//GET ALL THE BOOKING DETAILS
router.get('/', async (req,res)=>{
    try{
        const allBookings = await Booking.find();
        res.json(allBookings);
    }catch(err){
        res.json({message:err});
    }
});

//BOOKS A ROOM DEPENDING UPON THE AVAILABILITY
//Room       <______________>              <________>       Bookings already made for the room.
//Booking1                      <_______>                   Available!! :)
//Booking2              <_______>                           Unavailable :(
//Booking3                            <_______>             Unavailable :(
//Booking4               <_____________________>            Unavailable :(
router.post('/', async (req,res)=>{

    //Check if the requested room is available in the given period before booking
    const bookings = await Booking.find({
        roomNo: req.body.roomNo,
        $or: [
         { $and: [ { checkin: {$lt : req.body.checkout} }, { checkin : {$gt: req.body.checkin} } ] },
         { $and: [ { checkout: {$lt : req.body.checkout} }, { checkout: {$gt: req.body.checkin} } ] }
        ]
    }, {roomNo:1, _id:0}).distinct("roomNo");       //mysql equivalent query: select roomNo from bookings where (checkin>from and checkin<to) or (checkout>from and checkout<to)

    if(bookings.length!=0)  //one or more than one booking for that room in the given period     
    {
        console.log("Room Not Available");
        res.json({message:"Room Not Available"});
    }
    else
    {
        console.log("Room Available");
    
        const booking = new Booking({
            name: req.body.name,
            roomNo: req.body.roomNo,
            checkin: req.body.checkin,
            checkout: req.body.checkout,
            amount: req.body.amount
        });

        try{
            console.log("Booking in progress");
            const savedBooking = await booking.save();
            res.json(savedBooking);
            console.log("Booking done!!!!!!!");
        }catch(err){
            console.log(err);
            res.json({message:err});
        }
    }
});

//GET DETAILS OF A SPECIFIC BOOKING
router.get('/:bookingID', async (req,res)=>{
    try{
        const booking = await Booking.findById(req.params.bookingID);
        res.json(booking);
    }catch(err){
        res.json({message:err});
    }
});

module.exports = router;