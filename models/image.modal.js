const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    label: { 
        type: String, 
        required: [true, 'Image label must be provided'],
    },
    name: { 
        type: String, 
        required: true,
    },
    likes: {
        type: Number,
        required: true,
        default: 0,
    },
    uploadDate: { 
        type: Date, 
        required: true,
        default: Date.now() 
    },
});

module.exports = mongoose.model('image', ImageSchema);