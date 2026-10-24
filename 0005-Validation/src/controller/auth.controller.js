/**
 * req.body = email,phone password
 */

export async function register(req,res){

    const {email,phone,password} = req.body

    const error = []

    if(!email){
        error.push({
            field:"email",
            message:"Email is Required"
        })
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   
    if(email && !emailRegex.test(email)){
        error.push({
            field:"email",
            message:"Invaild email Address"

        })
    }

    if(!phone){
        error.push({
            field:"phone",
            message:"Phone number is required"
        })
    }

    const phoneRegex =/^(?:(?:\+91|91)[ -]?)?[6-9]\d{9}$/;

    if(phone && !phoneRegex.test(phone)){
        error.push({
            field:"phone",
            message:"Invalid phone number"
        })
    }

    if(!password){
        error.push({
            field:"password",
            message:"Phone number is Required"
        })
    }

    if(!password && !(password.trim())){
        error.push({
            field:"password",
            message:"password is Required"
        })
    }

    if(((password.trim()).length<6)){
        error.push({
            field:"password",
            message:"password must be contains 6 char"

        })
    }

    if(error.length > 0){
        return res.status(400).json({
            message:"Invaild Request",
            error
        })
    }

    //create user

    const user = await userModel.create({
        email,
        phone,
        password:password //hash(password)
    })
    res.status(201).json({
        message:"User Register Successfully",
        data:{
            email,
            phone,
            id:
        }
    })


}

/**
 * req.body ={
 * email:"dfghjcvbn",
 * phone:"45678"
 * password:" "
 * }
 * 
 * res.status = 400
 * res.body ={
 * message:"Invaild data"
 * error:[
 *      {
 *          filed:email,
 *           message:"Invaild Email"
 *      },
 *      {
 *          filed:phone,
 *          message:"Invalid Phone Number"
 *      }
 *      {
 *          filed:password,
 *          message:"password is required, recevied empty string"
 *       }
 * 
 *  ]
 * }
 */