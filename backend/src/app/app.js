import express from "express"
import urlRoutes from "../routes/url.routes.js"
import urlmodel from "../models/url.model.js"
import cors from 'cors'

const app = express()

//middleware
app.use(express.json())
app.use(cors())

//Routes
app.use("/api/url",urlRoutes)

app.get("/:code", async function(req,res){

    const {code} = req.params

    const url = await urlmodel.findOne({
        shortCode: code
    })
    if(!url){
        return res.status(400).json({
            error:"Url not found"
        })
    }

    res.redirect(302, url.originalUrl)

    await urlmodel.findOneAndUpdate({
        shortCode:code
    },{
        $inc:{clicks:1}
    })
})

export default app