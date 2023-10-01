const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/LogIn")
    .then(() => {
        console.log('mongoose connected');
    })
    .catch((e) => {
        console.log('failed');
    })

const logInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true,


    },
    password: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const LogInCollection = new mongoose.model('LogIn', logInSchema)

module.exports = LogInCollection