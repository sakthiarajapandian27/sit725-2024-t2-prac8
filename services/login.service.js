// const user = require('../Models/');

exports.findUser = (email,password)=>{
    return user.findOne({"email": email,"password": password});

}