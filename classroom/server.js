const express = require("express");
const app = express();
const users = require("./routes/user");
const posts = require("./routes/user");


app.use("/users",users);
app.use("/posts",users);


app.get("/", (req, res) => {
    res.send("Hi, I am root!");
});


app.listen(3000, () => {
    console.log("server is listening to 3000");
});
