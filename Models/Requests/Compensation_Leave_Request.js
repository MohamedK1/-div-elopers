const { string } = require('joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema
const CompensationLeaveRequestSchema = new Schema({
    ID : Number,
    senderID : Number,
    receiverID : Number,
    submissionDate : Date,
    requestedDate : Date,//The day he will attend
    absenceDate : Date,//The day he will be absent
    msg : String,
    status: String
});

module.exports =mongoose.model('Compensation_Leave_Request',CompensationLeaveRequestSchema);