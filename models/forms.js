
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formSchema = new Schema({
    form_id: {
        type: String,
        required: true
    },
    form_name: {
        type: String,
        required: true
    },
    form_description:{
        type: String,
        required: false
    },
    project_id:{
        type: String,
        required: true
    },
    creds_id:{
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

module.exports = mongoose.model('Form', formSchema);