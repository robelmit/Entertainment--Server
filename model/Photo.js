const mongoose = require('mongoose');
const schema = mongoose.Schema({
    catagory: {
        type: String,
        required: true,
    },
    photourl: {
        type: String,
        default: 'http://20.20.20.5:5000/avatar.jpg',
    },
});

module.exports = mongoose.model('Photo', schema);
