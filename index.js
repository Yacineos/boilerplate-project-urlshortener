require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const url = require("./url.schema");
const dns = require("dns");
const bodyParser = require("body-parser");
const validUrl = require('valid-url');
// Basic Configuration
const port = process.env.PORT || 3000;
//----------------------------------------------------------------------------------------------------//
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function(req, res) {
    res.sendFile(process.cwd() + "/views/index.html");
});

//@desc get an url
//@Route GET /api/shorturl/:id
//@acces PUBLIC
app.get("/api/shorturl/:short_url", async(req, res) => {
    try {
        //get data from req.params
        const { short_url } = req.params;
        //check if url exist in db if not send error
        const valideurl = await url.findOne({ short_url });
        if (!valideurl) return res.status(400).json({ error: "invalid url" });

        console.log(valideurl);
        const { original_url } = valideurl;

        //redirect user to this url
        res.redirect(original_url);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "error in api controller" });
    }
});

//@desc post an new url to db
//@Route POST /api/shorturl/
//@access PUBLIC
app.post("/api/shorturl", async(req, res) => {

    const inputUrl = req.body.url;
    console.log(inputUrl);
    try {
        //handle valide url
        if (!validUrl.isUri(inputUrl)) return res.status(400).json({ error: "invalid url" });


        //check if url exist in db if not send error
        const existurl = await url.findOne({ original_url: inputUrl });
        if (existurl) return res.send(existurl);

        //if not add it to db and send it to user
        const newUrl = new url({ original_url: inputUrl });
        const savedUrl = await newUrl.save();
        res.send(savedUrl);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }

});

require("./DB").connect();

app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});