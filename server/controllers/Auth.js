const {User} = require('../models/User');

exports.createUser = async (req, res) => {
    const user = new User(req.body);
    try{
        const doc = await user.save();
        res.status(200).json(doc);
    }catch(err){
        return res.status(400).json(err);
    }
};

exports.loginUser = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            res.status(400).json({message:"User not found"});
        }
        else if(user.password == password){
            res.status(201).json({id:user.id, email:user.email, name:user.name, address:user.address, phone:user.phone, role:user.role, token:user.token});
        }
        else{
            res.status(401).json({message:"Password is incorrect"});
        }
    }catch(err){
        res.status(400).json({err});
    }
};