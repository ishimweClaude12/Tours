const {promisify} = require('util');
const User = require('./../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
require('dotenv').config()

exports.signup = async (req, res, next)=>{
    try {
        const newUser = await User.create(req.body);
        const token = jwt.sign({id: newUser._id, email: newUser.email}, process.env.JWT_SECRET, {expiresIn: '1h'} )
        res.status(201).json({
            Status: 'Success', 
            data: {
                User: newUser, 
                token: token
            }
        })
    } catch (error) {
        console.log('Error' + error);
        res.status(400).json({
            Status: 'Failed ', 
            message: error
        })
    }
  
}
exports.login = async (req, res, next)=>{
    const email = req.body.email;
    const password = req.body.password;

   
if(!email ||  !password){
    console.log('Please enter a email and password');
}
const user =await User.findOne({email}).select('+password');

    if(!user || !( await user.correctPassword(password, user.password))){
        res.status(400).json({
            Status: 'Failed', 
            message: 'Incorrect Username and Password'
        })
        return next()
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'} )
    res.status(200).json({
        Status: 'Success',
        user_id: user._id,
        token
    })

}

exports.protect = async (req, res, next)=>{
    // check if the token exists
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
          token = req.headers.authorization.split(' ')[1];
            
        }
        
    
        if(!token){
            res.status(401).json({
                Status: 'Login First'
            })
        }
    
      const decoded =  await jwt.verify(token, process.env.JWT_SECRET)
        let freshUser = await User.findOne({_id: decoded.id});
        req.user = freshUser;
        next();
    } catch (error) {
        res.status(403).json({
            Status: 'Invalid Token'
        })
    }
   
}

exports.restrictTo = (...roles) =>{
    return (req, res, next)=>{
       if(roles.includes(req.user.role)){
        res.status(200).json({
            Status: 'Deleted Successfully'
        })
        next();
       }
       else{
        res.status(403).json({
            Status: 'Invalid Role'
        })
       }
    }
}