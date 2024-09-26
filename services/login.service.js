const { Registration} = require('../Models/signupModel');

exports.findUser = (email,password)=>{
    return  Registration.findOne({"email": email,"password": password});
    

}