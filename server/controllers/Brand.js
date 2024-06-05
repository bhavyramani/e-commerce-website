const {Brand} = require('../models/Brand');
exports.fetchBrands = async (req, res) => {
    try{
        const brands = await Brand.find({}).exec();
        res.status(200).json(brands);
    }catch(err){
        return res.status(400).json(err);
    }
};
exports.createBrand = async (req, res) => {
    const brand = new Brand(req.body);
    try{
        const doc = await brand.save()
        res.status(200).json(doc);
    }catch(err){
        return res.status(400).json(err);
    }
};