const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing}=require("../middleware.js");

const listingController=require("../controllers/listings.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });


//Index route
//Create route
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,validateListing ,upload.single('listing[image]'),wrapAsync(listingController.createListing));



 //new route
 router.get("/new", isLoggedIn , listingController.renderNewform);

 
 //show route
 //Update route
//Delete route
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn , isOwner, upload.single('listing[image]'),validateListing ,wrapAsync(listingController.updateListing))
.delete(isLoggedIn ,isOwner , wrapAsync(listingController.destroyListing));
 


 
 //Edit route
 router.get("/:id/edit", isLoggedIn ,isOwner ,wrapAsync(listingController.renderEditFrom));

 module.exports=router;
 