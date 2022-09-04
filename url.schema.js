const mongoose = require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose);

const urlSchema = new mongoose.Schema({
    short_url: {
        type: Number,
        unique: true

    },
    original_url: {
        type: String,
        required: true,
    },
})

urlSchema.plugin(AutoIncrement, { inc_field: 'short_url' });


module.exports = mongoose.model("url", urlSchema)