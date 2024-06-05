const { Product } = require('../models/Product');

exports.createProduct = async (req, res) => {
    const product = new Product(req.body);
    try {
        const doc = await product.save();
        return res.status(201).json(doc);
    } catch (err) {
        return res.status(400).json(err);
    }
};

exports.fetchAllProducts = async (req, res) => {
    let query = Product.find({});
    let totalDocs = Product.find({});
    if(req.query.category){
        query = query.find({category:req.query.category});
        totalDocs = totalDocs.find({category:req.query.category});
    }
    if(req.query.brand){
        query = query.find({brand:req.query.brand});
        totalDocs = totalDocs.find({brand:req.query.brand});
    }
    if(req.query._sort && req.query._order){
        query = query.sort({[req.query._sort]:req.query._order});
        totalDocs = totalDocs.sort({[req.query._sort]:req.query._order});
    }

    const totalCount = await totalDocs.count().exec();

    if(req.query._page && req.query._limit){
        query = query.skip(req.query._limit*(req.query._page-1)).limit(req.query._limit);
    }
    try {
        const doc = await query.exec();
        res.set('X-Total-Count', totalCount);
        return res.status(201).json(doc);
    } catch (err) {
        return res.status(400).json(err);
    }
};

exports.fetchProductById = async (req, res) => {
    const id = req.params.id;
    try{
        const product = await Product.findById(id);
        res.status(200).json(product);
    }catch(err){
        return res.status(400).json(err);
    }
};

exports.updateProduct = async (req, res) => {
    const id = req.body.id;
    try{
        const product = await Product.findByIdAndUpdate(id, req.body, {new:true});
        res.status(200).json(product);
    }catch(err){
        return res.status(400).json(err);
    }
};