const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/Admincoll")
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
    password: {
        type: String,
        required: true
    }
})

const AdminCollection = new mongoose.model('Admincoll', logInSchema)

module.exports = AdminCollection