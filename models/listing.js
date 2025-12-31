const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const listingschema=new Schema({
    title:{
        type:String,
        required:true
    },
    description: String,
image:{
     type:String,
     default: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
set:(v)=>
    v===""? "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" : v,
 },
price: Number,
location: String,
country: String,
reviews: [
  {
    type: Schema.Types.ObjectId,
    ref:"Review"
  },
]

});
const Listing=new mongoose.model("Listing",listingschema);
module.exports=Listing;