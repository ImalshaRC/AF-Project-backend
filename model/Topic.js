const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const passwordComplexity = require('joi-password-complexity');
const Joi = require('joi');

const TopicSchema = new Schema({

    person1 : {
        type : String,
        required : true
    },
    topic : {
        type : String,
        required : true
    },
    supervisor : {
        type : String,
        required : true
    },
    supervisorOpinion : {
        type : String,
        // required : true
    },
    coSupervisor : {
        type : String,
        // required : true
    },
    coSupervisorOpinion : {
        type : String,
        // required : true
    },
    document : {
        type : String,
        // required : true
    },
    finalDecision : {
        type : String,
        // required : true
    },
})

const Topic = mongoose.model("topic",TopicSchema);

module.exports = Topic;