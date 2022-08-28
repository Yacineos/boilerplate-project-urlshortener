const mongoose = require("mongoose")
const { Schema } = mongoose

const urlSchema = new Schema({
    short_url: {
      type: Number,
      required: true,
      unique:true
      
    },
    original_url: {
      type: String,
      required: true,
    },
},{timestamps:true})

module.exports = mongoose.model("url",urlSchema)