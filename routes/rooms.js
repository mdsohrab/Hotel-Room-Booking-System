const express = require('express');
const router = express.Router();
const Room = require('../models/Rooms');

//GET ALL THE ROOM DETAILS
router.get('/', async (req,res)=>{
    try{
        const allRooms = await Room.find();
        res.json(allRooms);
    }catch(err){
        res.json({message:err});
    }
});

//MAKE A ROOM
router.post('/', async (req,res)=>{
    const room = new Room({
        roomNo: req.body.roomNo,
        capacity: req.body.capacity
    });
    try{
        console.log("Creating Room in db started");
        const savedRoom = await room.save();
        res.json(savedRoom);
        console.log("Room inserted!!!!!!!");
    }catch(err){
        console.log(err);
        res.json({message:err});
    }
    console.log(req.body);
});

module.exports = router;