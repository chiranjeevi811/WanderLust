const express = require("express");
const app = express();
const users = require("./routes/user");
const posts = require("./routes/post");
const cookieParser = require("cookie-parser");


app.use(cookieParser("secretcode"));


//cookies
app.get("/setsignedcookies", (req, res) => {
    res.cookie("gods", "plans",{signed:true});
    res.send("We sent you a signed cookie!");
});

app.get("/verifysignedcookies", (req, res) => {
    console.log(req.signedCookies);
    res.send("verified!");
});


app.get("/setcookies", (req, res) => {
    res.cookie("greet", "namaste");
    res.cookie("origin", "India");
    res.send("We sent you a cookie!");
});

app.get("/greet", (req, res) => {
 
    let {name="anonymous"}=req.cookies;
    res.send(  ` Hello,${name}`);
});



app.use("/users",users);
app.use("/posts",posts);


app.get("/", (req, res) => {
    console.log(req.cookies);
    res.send("Hi, I am root!");
});


app.listen(3000, () => {
    console.log("server is listening to 3000");
});
