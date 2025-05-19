import userModel from "../model/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'


const createToken = (id)=>{
  return jwt.sign({id},process.env.JWT_SECRET)
}

// user register-----
const registerUser =async (req,res)=>{
  const {username,email,password}=req.body
  try {
    const existUser = await userModel.findOne({email})
    if (existUser) {
      return res.json({success:false,message:'User already exists'})
    }
    // Validating email format and strong password-
    if (!validator.isEmail(email)) {
      return res.json({success:false,message:'Please enter a valid email'})
    }
    if (password.length<8) {
      return res.json({success:false,message:'Please enter a strong password'})
    }

    // Hashhing password-
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    const newUser = new userModel({
      username,
      email,
      password:hashedPassword
    })
    const user = await newUser.save();

    const token = createToken(user._id)
     res.json({
      success: true,
      message: "Registration successful",
      user: { id: user._id, username: user.username, email: user.email },
      token,
    });

  } catch (error) {
        res.json({success:false,message:'Error'})

  }
}


// User Login-

const LoginUser = async (req,res)=>{
  const {email,password} = req.body;
  try {
    const user = await userModel.findOne({email})
    if (!user) {
      res.json({success:false,message:'User does not exist'})
    }
    const isMatch =await  bcrypt.compare(password,user.password)
    if (!isMatch) {
      res.json({success:false,message:'Something went wrong'})
    }

    const token = createToken(user._id)
    res.json({success:true,message:token})



  } catch (error) {
        res.json({success:false,message:'Error'})

  }
}

export {registerUser,LoginUser};