import app from './app/app.js'
import { connectDB } from './config/db.js';

await connectDB()

app.listen(4000, ()=>{
    console.log("Server is running on port 4000");
    
})
