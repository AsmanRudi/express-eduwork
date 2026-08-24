const Product = require("./model");

// get semua products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      succes: true,
      version: "v2",
      method: "mongoose",
      data: products,
    });

    } catch (error) {
      res.status(200).json({
        succes: false,
        message: error.message,
      });
    }

  
};

// GET PRODUCT BY ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product tidak ditemukan",
            });
        }

        res.status(200).json({
            success: true,
            version: "v2",
            method: "Mongoose",
            data: product,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// CREATE PRODUCT
const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            version: "v2",
            method: "Mongoose",
            data: product,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product tidak ditemukan",
            });
        }

        res.status(200).json({
            success: true,
            version: "v2",
            method: "Mongoose",
            data: product,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(
            req.params.id
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product tidak ditemukan",
            });
        }

        res.status(200).json({
            success: true,
            version: "v2",
            method: "Mongoose",
            message: "Product berhasil dihapus",
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};