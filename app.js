const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const listingSchema=require("./utils/ExpressError.js");
const {listingsSchema}=require("./schema.js");
const Review = require("./models/review.js");



main()
.then(()=>{
    console.log("connected mbd");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
res.send("root working");
});


const validateListing = (req, res, next) => {
    let { error } = listingsSchema.validate(req.body);
    if (error) {
      // console.log(error);
      let errMsg=error.details.map(el => el.message).join(",")
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};


app.get("/testListing",wrapAsync(async(req,res)=>{
let sample=new Listing({
     title: "My New Villa",
  description: "By the beach",
  price: 1200,
  location: "Calangute, Goa",
  country: "India"
 
});
await sample.save();
console.log("saved");
res.send("successful lisyinf");
    }));

//index route
app.get("/listings",wrapAsync(async(req,res)=>{
  const listings = await Listing.find({});
    res.render("listings/index.ejs",{listings});

}));

//new route
app.get("/listings/new",(req,res)=>{

    res.render("listings/new.ejs");

});

//create route
app.post("/listings",validateListing,  wrapAsync(async(req,res,next)=>{
 
  
     const newlisting=new Listing(req.body.listing);
    await newlisting.save();
   res.redirect("/listings");
   

}));

// Reviews
// Post Route
app.post("/listings/:id/reviews", async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  console.log("new review saved");
  res.send("new review saved");
});

//show route

app.get("/listings/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
  const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});

}));


//edit route
app.get("/listings/:id/edit",wrapAsync(async(req,res)=>{
    let {id}=req.params;
  const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});

}));


//update route
app.put("/listings/:id",validateListing,wrapAsync(async(req,res)=>{
  
    let {id}=req.params;
   await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);

}));

//delete route
app.delete("/listings/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
   const deklletd=await Listing.findByIdAndDelete(id);
   console.log(deklletd);
    res.redirect("/listings");

}));







app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

app.use((err,req,res,next)=>{
  let {status=500,message}=err;
  
res.status(status).render("./listings/error.ejs",{message});
});
app.listen(8080,()=>{
console.log("listenibg");
});