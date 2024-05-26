const express = require("express");
const path = require("path");
const {cookie_parser} = require("cookie-parser");
const app = express();


app.use(cors({
     origin:process.env.CORS_ORIGIN,
     Credential:true
}))
app.use(express.json({limit:"20mb"}))
.use(express.urlencoded({extended:true,limit:"20mb"}))   //encoded allow to write nested obj 

.use(express.static(path.join(__dirname,"public")))
.use(cookie_parser())

app.get("/", (req, res) => res.send("Hello World!"));

module.exports={app}
