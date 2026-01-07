const express = require("express");
const app = express();
const users = require("./routes/user");
const posts = require("./routes/post");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions= {
    secret:"secretcode",
    resave:false,
    saveUninitialized:true
};


app.use(session(sessionOptions));

app.use(flash());



// app.use(cookieParser("secretcode"));


// //cookies
// app.get("/setsignedcookies", (req, res) => {
//     res.cookie("gods", "plans",{signed:true});
//     res.send("We sent you a signed cookie!");
// });

// app.get("/verifysignedcookies", (req, res) => {
//     console.log(req.signedCookies);
//     res.send("verified!");
// });


// app.get("/setcookies", (req, res) => {
//     res.cookie("greet", "namaste");
//     res.cookie("origin", "India");
//     res.send("We sent you a cookie!");
// });

// app.get("/greet", (req, res) => {
 
//     let {name="anonymous"}=req.cookies;
//     res.send(  ` Hello,${name}`);
// });



// app.use("/users",users);
// app.use("/posts",posts);


// app.get("/", (req, res) => {
//     console.log(req.cookies);
//     res.send("Hi, I am root!");
// });


app.get("/test", (req, res) => {
   
    res.send("Hi, I am root!");
});

// app.get("/reqcount", (req, res) => {
// if( req.session.count)
// {
//      req.session.count+=1;
// }else{
//      req.session.count=1; 
// }
//     res.send(`You sent a request ${req.session.count} times`);
// });


app.get("/register", (req, res) => {
   const {name="anonymous"} =req.query;
   req.session.name=name;
   if(name!="anonymous")
   {
       req.flash("successMsg","user registered successfully!!");

   }else{
         req.flash("errorMsg","user not registered successfully!!");

   }
    res.redirect("/hello");
});


app.use((req,res,next)=>{
    res.locals.successMsg=req.flash("successMsg");
        res.locals.errorMsg=req.flash("errorMsg");
    next();
});

app.get("/hello", (req, res) => {
   

    res.render("page.ejs",{name:req.session.name});
});

app.listen(3000, () => {
    console.log("server is listening to 3000");
});
