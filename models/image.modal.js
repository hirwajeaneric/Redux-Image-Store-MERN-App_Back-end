const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Full name must be provided'],
    },
    uploadDate: { 
        type: Date, 
        required: true,
        default: Date.now() 
    },
});

module.exports = mongoose.model('image', ImageSchema);