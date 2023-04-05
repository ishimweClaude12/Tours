const {promisify} = require('util');
const User = require('./../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
require('dotenv').config();
const sendEmail = require('./../utils/email');
const APPERROR = require('./../utils/ErrorHandler');

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
          return  res.status(401).json({
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
};
exports.forgotPassword = async (req, res, next) =>{

    const user = await User.findOne({email: req.body.email});

    if(!user){
        return res.status(404).json({
            Status: 'This user is not found'
          
        })
        next()
    }
    const resetToken = user.createPasswordResetToken();
    console.log(resetToken);
    User.passwordResetToken = resetToken;
    await user.save( {validateBeforeSave: false });
    
    const message = `This message is to let you know that your password is being reset, if you alow it to be altered then click the button below or else your reset token is ${resetToken}`;
    try{
        await sendEmail({
        to : user.email,
       // to: 'ishimweklaude7@gmail.com',  
        subject: 'Your Password reset token is valid for 10 minutes' ,
        message, 
        resetToken
    })
    res.status(200).json({
        Status: 'Token Sent With the Email',
        resetToken
    });
    } catch{
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save( {validateBeforeSave: false });
        next();
    }
}
exports.resetPassword = async(req, res,next) =>{
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return next(new APPERROR('The email provided does not exist among the users', 404))
    }
    res.status(200).json({
        Status: 'Success', 
        user
    })
}
exports.updatePassword = async (req, res, next)=>{

    const user = User.findOne({user});

}