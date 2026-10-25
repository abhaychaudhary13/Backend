import app from "./app/app.js"

import {connectDB} from "./config/db.js";

await connectDB();

app.listen(3000, ()=>{
    console.log("server is Starting on Port 3000")
})  