
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    project_id: {
        type: String,
        required: true
    },
    project_name: {
        type: String,
        required: true
    },
    project_description:{
        type: String,
        required: false
    },
    project_owner:{
        type: String,
        required: true
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

module.exports = mongoose.model('Project', projectSchema);