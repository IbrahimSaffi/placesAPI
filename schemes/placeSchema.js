const mongoose = require("mongoose")
const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        default:Date.now( )
    },
    updated_at:{
        type: Date,
        default:Date.now( )
    }
})
const placeModel = mongoose.model("place",placeSchema)
module.exports = placeModel;