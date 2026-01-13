const Listing=require("../models/listing")
const axios = require("axios");
const mapToken = process.env.MAP_TOKEN;


module.exports.index=async(req,res)=>{
  const listings = await Listing.find({});
    res.render("listings/index.ejs",{listings});

}

module.exports.renderNewForm=(req,res)=>{
  
    res.render("listings/new.ejs");

}

module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
  const listing = await Listing.findById(id)
  .populate({
    path: "reviews",
    populate: {
        path: "author",
    },
})
.populate("owner");
  if(!listing){
    req.flash("error","The Listing you requested does not exist!");
    return res.redirect("/listings")
  }
  console.log(listing);
    res.render("listings/show.ejs",{listing});

}

module.exports.createListing=async(req,res,next)=>{
  const location = req.body.listing.location;

let response = await axios.get(
  `https://api.maptiler.com/geocoding/${encodeURIComponent(location)}.json`,
  {
    params: {
      key: process.env.MAP_TOKEN,
      limit: 1
    }
  }
);


 
  let url = req.file.path;
let filename = req.file.filename;



   const newlisting = new Listing(req.body.listing);
   newlisting.owner = req.user._id;
   newlisting.image = { url, filename };
    newlisting.geometry=response.data.features[0].geometry;



   await newlisting.save();
   console.log(newlisting);

    req.flash("success","New Listing Created!!");
   res.redirect("/listings");
   

}

module.exports.renderEditForm=async(req,res)=>{
    let {id}=req.params;
  const listing = await Listing.findById(id);
   if(!listing){
    req.flash("error","The Listing you requested does not exist!");
    return res.redirect("/listings")
  }
  let originalImageUrl = listing.image.url;
originalImageUrl=originalImageUrl.replace("/upload", "/upload/w_250");
res.render("listings/edit.ejs", { listing,originalImageUrl });

   

}


module.exports.updateListing=async(req,res)=>{
  
    let {id}=req.params;
  
   let updlisting=await Listing.findByIdAndUpdate(id,{...req.body.listing});
if(typeof req.file !=="undefined")
{
    let url = req.file.path;
let filename = req.file.filename;
updlisting.image={url,filename};
await updlisting.save();
}
   


       req.flash("success","Listing Updated!!")

    res.redirect(`/listings/${id}`);

}


module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
   const deletedListing =await Listing.findByIdAndDelete(id);
//    console.log(deletedListing );
    req.flash("success","Listing Deleted!!")

    res.redirect("/listings");

}