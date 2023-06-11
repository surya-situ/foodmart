import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// Fetch products:
const getProducts = asyncHandler( async (req, res) => {
    const products = await Product.find({})
    res.json(products)
});

//Each product
const getProductById = asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(product) {
        return res.json(product)
    } else {
        res.status(404);
        throw new Error('Product not found')
    }
});

//?CREATE A PRODUCT
//!ADMIN
const createProduct = asyncHandler( async (req, res) => {
    const product = new Product({
        name: 'sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'sample brand',
        category: 'sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'sample desc'
    })

    const createProduct = await product.save();
    res.status(201).json(createProduct)
});


//?UPDATE A PRODUCT
//!ADMIN   
const updateProduct = asyncHandler( async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body

    const product = await Product.findById(req.params.id)

    if(product) {
        product.name = name,
        product.price = price,
        product.description = description,
        product.image = image,
        product.brand = brand,
        product.category = category,
        product.countInStock = countInStock

        const updateProduct = await product.save();

        res.json(updateProduct)
    } else {
        res.status(404);
        throw new Error('Resource not found')
    }
});


export {getProducts, getProductById, createProduct, updateProduct};