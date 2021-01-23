const mongoose = require('mongoose');

// create Room Schema and model
const RoomSchema = mongoose.Schema({
    roomNo:{
        type: Number,
        required: [true, 'Room No. is required'],
        unique: [true, 'Room No. must be unique'],
    },
    capacity: {
        type: Number,
        required: [true, 'Capacity is required']
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;