const {User} = require('../models/User');
exports.fetchUserById = async (req, res) => {
    const id = req.params.id;
    try{
        const user = await User.findById(id).exec();
        res.status(200).json(user);
    }catch(err){
        return res.status(400).json(err);
    }
};

exports.updateUser = async (req, res) => {
    const id = req.params.id;
    try{
        const doc = await User.findByIdAndUpdate(id, req.body, {new:true});
        res.status(200).json(doc);
    }catch(err){
        return res.status(400).json(err);
    }
};