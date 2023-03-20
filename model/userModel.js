const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'please enter a user name'], 
    },
    email: {
            type: String, 
            require: [true, 'please proved a email'], 
            unique: true, 
            lowercase: true, 
            validate: [validator.isEmail, 'Please Provide a valid Email']
            
        },
    photo: String, 
    password: {
            type: String, 
            required: [true, 'Please Provide a Password'], 
            minlength: 8,
            select: false
        }, 
    passwordConfirm: {
            type: String, 
            required: [true, 'Please confirm'], 
            validate: {
                validator:  function(el){
                    return el === this.password;
                }, 
                message: 'Confirm Your Password'
            },
            select: false

        }
    });
    // Using bcryptjs is different from usiing plain bcrypt because bcryptjs is only used in nodejs and javascript applications, while bcrypt can be used in a wide variety of programming languages. A pro tip is to use bcryp because it accepts asynchronous and syncronous functions but bcryptjs only uses asynchronous functions only...
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next(); // this set ocnfirm password filed to be deleted or nullified
});
userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword)
}
const User = mongoose.model('User', userSchema);

module.exports = User;