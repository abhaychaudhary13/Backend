import crypto from 'crypto'

/**
 * Generate a 6 charter long unique short code 
 */

const generateCode = ()=> {

    const mainString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let shortCode = ""

    for(let i =0; i<6; i++){
        shortCode+= mainString.charAt(Math.floor(Math.random()*62))

    }
    return shortCode
}

export default generateCode