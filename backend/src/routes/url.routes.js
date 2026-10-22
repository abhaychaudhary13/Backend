import express from 'express'
import generateCode from '../utils/generateCode.js'
import urlmodel from '../models/url.model.js'

const router = express.Router()

/**
 * @post /api/url
 * req.body = {url:https://longerurl.com}
 * 
 */

router.post("/", async function(req,res){

    const {url} = req.body

    //vaidation
    if(!url){
        return res.status(400).json({error:"plx enter a vaild url"})
    }
    if((url.startsWith("http://") == false) && (url.startsWith("https://")==false)){
        return res.status(400).json({error:"Please enter a valid URL starting with http:// or https://"})
    } 
    if(url.length > 2048){
        return res.status(400).json({error:"url is too long."})
    }

    //generate Sortcode

    const code = generateCode()

    const newUrl = await urlmodel.create(
        {
            originalUrl:url,
            shortCode:code
        }
    )

    return res.status(201).json({
        message:"url sortend succesfully",
        data:{
            originalUrl:newUrl.originalUrl,
            shortCode:newUrl.shortCode

        }
    })
})

//get all
router.get("/", async function(req,res){

    const urls = await urlmodel.find()

    return res.status(200).json({
        message:"Urls fetched Successfully",
        data:{
            urls
        }
    })
})

/**
 * delete 
 */
router.delete("/:id", async function(req,res){

    const{id} = req.params

    const url = await urlmodel.findById(id)

    if(!url){
        return res.status(404).json({
            message:"url not found"
        })
    }

    await urlmodel.findByIdAndDelete(id)

    return res.status(200).json({
        message:"Url deleted successfully"
    })
})



export default router;