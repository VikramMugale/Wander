const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust"

main()
.then(()=>{
    console.log("connected to db");
})
.catch((err) =>{
    console.log(err);
});

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB=async ()=>{
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj)=>({...obj,owner:'66c5dd4049b73eec941237e2'}))
    await Listing.insertMany(initdata.data);
    console.log("data was initialized");
}

initDB();