
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const credsSchema = new Schema({
    creds_id: {
        type: String,
        required: true
    },
    creds_name: {
        type: String,
        required: true,
        default: 'default'
    },
    creds_description:{
        type: String,
        required: false
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: false
    },
    created_at:{
        type: Date,
        required: false,
        default: Date.now
    },
    updated_at:{
        type: Date,
        required: false,
        default: Date.now
    },
    active:{
        type: String,
        required: true,
        default: '1'
    }

});

module.exports = mongoose.model('Creds', credsSchema);