const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "field nama harus ada"],
            minlength: 3,
            maxlength: 100,
            trim: true,
        },

        price: {
            type: Number,
            required: [true, "field harga harus ada"],
            min: [1000, "harga minimal 1000"],
            max: [100000000, "harga maksimal 100000000"],
        },

        stock: {
            type: Number,
            required: [true, "field stock harus ada"],
            min: [0, "stock tidak boleh negatif"],
        },

        status: {
            type: Boolean,
            default: true,
        },

        image_url: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Product =
    mongoose.models.Product ||
    mongoose.model("Product", productSchema, "products");

module.exports = Product;