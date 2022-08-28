const mongoose = require("mongoose")

exports.connect = async function(){
  return  mongoose.connect(process.env.URI_MONGODB,	{
  useNewUrlParser: true,
  useUnifiedTopology: true,
} ,
(err) => {
  if (err) throw err
  console.log("Connected to MongoDB.")
},)
}