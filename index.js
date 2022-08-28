require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const url = require("./url.schema")

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

//@desc get an url 
//@Route GET /api/shorturl/:id
//@acces PUBLIC
app.get('/api/shorturl/:short_url', (req, res)=>{
  try{
  //get data from req.params
    const { short_url } = req.params;
  //check if url exist in db if not send error
    const valideurl = url.findOne({short_url})
    if(!valideurl) return res.status(400).json({ error: 'invalid url' })
    const temp = JSON.stringify(valideurl);
    const valideurlobject = JSON.parse(temp);
    console.log(valideurlobject)
    const {original_url} = valideurl 
    //original_url:""
    //short_url: 1
   
  //redirect user to this url
  res.redirect(original_url)
  
  }catch (e)
  {
    console.log(e)
    res.status(500).json({error:"error in api controller"})
  }
})

//@desc post an new url to db
//@Route POST /api/shorturl/
//@access PUBLIC
app.post("/",(req,res)=>{


  //get data from req.body
  
  //handle valide url
  //post this data to database

  //redirect to /api/shorturl with json object of original url + short url
})

require("./DB").connect()

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
