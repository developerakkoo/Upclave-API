const Admin = require('./../Model/user');
const App = require('./../Model/App');

const Razorpay = require('razorpay');
var instance = new Razorpay({ key_id: 'rzp_test_v4dgKyYswyUm3g', key_secret: 'XGjgkjR7RrwlIvfSof1OSjBe' })


const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { mongoose } = require('mongoose');

exports.createOrder = async(req, res, next) =>{
    try {
        let amount = req.body.amount;
        var options = {
            amount: amount,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
          };
           instance.orders.create(options, function(err, order) {
            if(order){
                console.log(order);
            res.status(200).json({
                order,
                message: "Order created"
            })
            }else{
                console.log(err);
            res.status(500).json({
                message: err
            })
            }
          });
    } catch (error) {
        res.status(400).json({message: error.message, status:'error'});
        
    }
}
exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    let loadedUser;


    Admin.findOne({ email: email})
    .then(admin => {
        if(!admin){
           res.status(404).json({
               status: false,
               message: "User No Found"
           })
        }

        loadedUser = admin;

        bcrypt.compare(password, admin.password)
        .then(doMatch => {
            if(!doMatch){
                res.status(404).json({
                    status: false,
                    message: "Password Do not Match"
                })
            }

            const token = jwt.sign({
                email: loadedUser.email,
                userId: loadedUser._id.toString(),
            },"!23ThisisaSecretFor@#$%^%^^&&allthebest", {expiresIn: '3h'})

            res.status(200).json({
                message: 'Sign In Successfull',
                token: token,
                userId: loadedUser._id.toString()
            })
        });
    }).catch(err =>{
        res.status(400).json({message: err.message, status:'error'});
    })
}


exports.postSignup = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    Admin.findOne({ email: email})
    .then(admin => {
        if(admin){
           res.status(400).json({
               status: false,
               message: 'User with email Already Exists'
           })
        }

        bcrypt.hash(password, 12)
        .then((hashedPasswords) => {
            const admin = new Admin({
                email: email,
                password: hashedPasswords,
                isActive: false,
                isRechargeValid: false,
                isBlocked: false,
                app: []
            })
    
            return admin.save();
        }).then((result) => {
            res.status(201).json({message: 'Admin Created Successfully!', status: '201', userId: result._id});
        })
    })
    
   .catch(err =>{
    res.status(400).json({message: error.message, status:'error'});
    })

   

}


exports.addAppToUser = async(req, res, next) =>
{
    try {
        let userId = req.params.userId;
        let appId = req.params.appId;
        console.log(userId);
        console.log(appId);
        Admin.findByIdAndUpdate(userId, {
            $addToSet:{
                apps: appId
            }
        }).then((app) =>{
            res.status(201).json({message: 'App Added Successfully!'});

        }).catch((err) =>{
            res.status(500).json({
                status: false,
                message: err.message
            })
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

exports.removeAppFromUser = async(req, res, next) =>{
    try {
        let userId = req.params.userId;
        let appId = req.params.appId;
        console.log(userId);
        console.log(appId);
        Admin.findByIdAndUpdate(userId, {
            $pull:{
                apps: appId
            }
        }).then((app) =>{
            res.status(201).json({message: 'App Removed Successfully!'});

        }).catch((err) =>{
            res.status(500).json({
                status: false,
                message: err.message
            })
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}


exports.getUser = async(req, res, next) =>{
    try {
        let userId = req.params.id;

        const user = await Admin.findOne({_id: userId}).populate("apps");

        if(user){
            res.status(200).json({
                user,
                status: true,
                message:"User Found"
            })
        }

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

exports.getAllUser = async(req, res, next) =>
{
    try {

        const user = await Admin.find({}).populate("apps");

        if(user){
            res.status(200).json({
                user,
                status: true,
                message:"User Found"
            })
        }

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}


exports.putUser = async(req, res, next) =>{
    try {
        let userId = req.params.id;
        
        const user = await Admin.findByIdAndUpdate(userId, req.body);

        if(user){
            res.status(201).json({
                status: true,
                message: 'User Updated'
            })
        }


    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}




exports.deleteUser = async(req, res, next) =>{
    try {
        let userId = req.params.id;
        
        const user = await Admin.findByIdAndDelete(userId);

        if(user){
            res.status(200).json({
                status: true,
                message: 'User Deleted'
            })
        }

        
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}