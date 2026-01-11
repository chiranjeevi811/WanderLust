const Listing=require("../models/listing")

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
 
  
     const newlisting=new Listing(req.body.listing)
     newlisting.owner=req.user._id;
    await newlisting.save();
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
    res.render("listings/edit.ejs",{listing});

}


module.exports.updateListing=async(req,res)=>{
  
    let {id}=req.params;
  
   await Listing.findByIdAndUpdate(id,{...req.body.listing});
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