'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    CreationDate:{
        type: Date,
        default: Date.now
    },
    status:{
        type:[{
            type: String,
            enum: ['pending', 'active', 'finished']
        }],
        default: ['pending']
    }
});

module.exports = mongoose.model('task-models', schema);