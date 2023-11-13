
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true,
        default: 'local'
    },
    provider_id: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    avatar:{
        type: String,
        required: false
    },
    password:{
        type: String,
        required: false
    },
    user_type:{
        type: Number,
        required: true,
        default: 3
    },
    verified:{
        type: Boolean,
        required: true,
        default: false
    },
    created_at:{
        type: Date,
        required: false,
        default: Date.now
    },
    last_login:{
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

module.exports = mongoose.model('User', userSchema);