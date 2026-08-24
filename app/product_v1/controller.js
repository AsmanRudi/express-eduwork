const { ObjectId } = require('mongodb');
const { getDB } = require('../../config/mongodb');

const getCollection = () => {
    return getDB().collection("products");

};

const getProducts = async (req, res) => {
    try {
        const products = await getCollection()
        .find({})
        .toArray();

        res.status(200).json({
            succes: true,
            version: "v1",
            method: "MongoDB Native",
            data: products,

        });
    } catch (error) {
        res.status(500).json({
            succes: false,
            message: error.message,
        });
    }
};


const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                succes: false,
                message: "ID product tidak falid"
            });

        }

        const product = await getCollection().findOne({
            _id: new ObjectId(id),
        });

        if (!product) {
            return res.status(404).json ({
                succes: false,
                message: "Product tidak ditemukan",
            });
        }

        res.status(200).json({
            succes: true,
            version: "v1",
            method: "MongoDB Native",
            data: product,
        });
    }
    catch (error) {
        res.status(500).json({
            succes: false,
            message: error.message,
        });
    }
};


// Create Product
const createProduct = async (req, res) => {
    try {
        const { name, price, stock, category } = req.body;

        if (
            !name ||
            price === undefined ||
            stock === undefined ||
            !category
        ) {
            return res.status(400).json({
                succes: false,
                message: "nama, price, stock, dan category wajib diisi..",
            });
        }

        const product = {
            name,
            price: Number(price),
            stock: Number(stock),
            category,
            createAT: new Date(),
            updateAT: new Date(),
        };

        const result = await getCollection().insertOne(product);

        const createdProduct = await getCollection().findOne({
            _id: result.insertedId,
        });

        res.status(201).json({
            succes: true,
            version: "v1",
            method: "MongoDB Native",
            data: createdProduct,
        });
    } catch ( error) {
        res.status(500).json({
            succes: false,
            message: error.message,
        });
    }
};


// update
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                succes: false,
                message: "ID product tidak valid",
            });
        }

        const { name, price, stock, category } = req.body;

        const updateData = {
            updateAt: new Date(),
        };

        if (name !== undefined) {
            updateData.name = name;
        }
        if (price !== undefined) {
            updateData.price = Number(price);
        }
        if (stock !== undefined) {
            updateData.stock = Number(stock);
        }
         if (category !== undefined) {
            updateData.category = category;
        }
    

    const result = await getCollection().updateOne(
        {
            _id: new ObjectId(id),
        },
        {
            $set: updateData,
        }
    );
    if (result.matchedCount === 0) {
        return res.status(404).json({
            succes: false,
            message: "Product tidak ditemukan",
        });
    }

    const product = await getCollection().findOne({
        _id: new ObjectId(id),
    });

    res.status(200).json({
        succes: true,
        version: "v1",
        method: "MongoDB Native",
        data: product,
    });
} catch (error) {
    res.status(500).json({
        succes: false,
        message: error.message,
    });
}
};

//delete product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                succes: false,
                message: "ID product tidak Valid"
            });
    }

    const result = await getCollection().deleteOne({
            _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
        return res.status(404).json({
            succes: false,
            message: "Product tidak ditemukan",
        });
    }

    res.status(200).json({
        succes: true,
        version: "v1",
        method: "MongoDB Native",
        message: "Product berhasil dihapus",
    });
} catch (error) {
    res.status(500).json({
        succes: false,
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