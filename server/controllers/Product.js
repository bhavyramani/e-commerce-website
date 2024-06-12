const { Product } = require('../models/Product');

exports.createProduct = async (req, res) => {
    let product = new Product(req.body);
    product.discountPrice = Math.round(product.price * (1 - product.discountPercentage / 100));
    try {
        const doc = await product.save();
        return res.status(201).json(doc);
    } catch (err) {
        return res.status(400).json(err);
    }
};

exports.fetchAllProducts = async (req, res) => {
    let query = Product.find({ deleted: { $ne: true } });
    let totalDocs = Product.find({});
    if (req.query.category) {
        query = query.find({ category: { $in: req.query.category.split(',') } });
        totalDocs = totalDocs.find({ category: { $in: req.query.category.split(',') } });
    }
    if (req.query.brand) {
        query = query.find({ brand: { $in: req.query.brand.split(',') } });
        totalDocs = totalDocs.find({ brand: { $in: req.query.brand.split(',') } });
    }
    if (req.query._sort && req.query._order) {
        query = query.sort({ [req.query._sort]: req.query._order });
        totalDocs = totalDocs.sort({ [req.query._sort]: req.query._order });
    }

    const totalCount = await totalDocs.count().exec();

    if (req.query._page && req.query._limit) {
        query = query.skip(req.query._limit * (req.query._page - 1)).limit(req.query._limit);
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
    try {
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (err) {
        return res.status(400).json(err);
    }
};

exports.updateProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        product.discountPrice = Math.round(product.price * (1 - product.discountPercentage / 100));
        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    } catch (err) {
        return res.status(400).json(err);
    }
};