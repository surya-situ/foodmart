import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

//? Fetch products:
const getProducts = asyncHandler( async (req, res) => {
    // const pageSize = 12;
    // const page = Number(req.query.pageNumber) || 1;
    // const count = await Product.countDocuments();
    // const products = await Product.find({}).limit(pageSize).skip(pageSize * (page -1));
    // res.json({products, page, pages: Math.ceil(count / pageSize)})
    // const keyword = req.query.keyword ? {name: { $regex: req.query.keyword, $options: 'i' }} : {};
    // const products = await Product.find({...keyword})

    const products = await Product.find({})
    res.json(products)
});

//?Each product
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

//? Delete a product
//!  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
  
    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ message: 'Product removed' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
});


//? Create new review
//! Private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
  
    const product = await Product.findById(req.params.id);
  
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
  
      if (alreadyReviewed) {
        res.status(400);
        throw new Error('Product already reviewed');
      }
  
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
  
      product.reviews.push(review);
  
      product.numReviews = product.reviews.length;
  
      product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;
  
      await product.save();
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404);
      throw new Error('Resource not found');
    }
});


//?    Get top rated products
//*  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(5);

  res.json(products);
});

export {getProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview, getTopProducts};