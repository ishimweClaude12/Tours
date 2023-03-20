const User = require("../model/userModel");

exports.getAllUsers = async (req, res)=>{
    try{
       


        const user =      await User.find();
        res.status(201).json({
            status: 'Success', 
            results: user.length, 
            data:{
                user
            }
        })
    }catch(err){
        res.status(400).json({
            status: 'failed',
             
            Message : {
            Error: 'could not find your req' + err
            }
        });
    }
   
}
exports.createUser = async (req, res)=>{
    const newUser = await User.create({
        name: req.body.name, 
        email: req.body.email, 
        password: req.body.password, 
        passwordConfirm: req.body.passwordConfirm


    });
    res.status(201).json({
        Status: 'Success', 
        data: {
            user: newUser
        }
    })

    res.status(500).json({
        status: 'error', 
        message: 'this route is not yet defined'
    });
};
exports.getUser = (req, res)=>{
    res.status(500).json({
        status: 'error', 
        message: 'this route is not yet defined'
    });
};
exports.udateUser = (req, res)=>{
    res.status(500).json({
        status: 'error', 
        message: 'this route is not yet defined'
    });
};
exports.deleteUser = (req, res)=>{
    res.status(500).json({
        status: 'error', 
        message: 'this route is not yet defined'
    });
};
