const path = require('path');
const fs = require('fs');
const connection = require('../../config/mysql');

module.exports = {
    index: async (req, res) => {
        try {
            const { search } = req.query;
            let exec = 'SELECT * FROM products';
            let params = [];

            if (search) {
                exec = 'SELECT * FROM products WHERE name LIKE ?';
                params = [`%${search}%`];
            }

            const [results] = await connection.query(exec, params);
            res.json(results);
        } catch (err) {
            console.error(err);
            res.status(500).json({
                status: 'failed',
                message: 'Internal Server Error'
            });
        }
    },

    show: async (req, res) => {
        try {
            const { id } = req.params;
            const [results] = await connection.query(
                'SELECT * FROM products WHERE id = ?',
                [id]
            );
            res.json(results);
        } catch (err) {
            console.error(err);
            res.status(500).json({
                status: 'failed',
                message: 'Internal Server Error'
            });
        }
    },

    destroy: async (req, res) => {
        try {
            const { id } = req.params;
            const [results] = await connection.query(
                'DELETE FROM products WHERE id = ?',
                [id]
            );
            res.json({
                status: 'success',
                message: 'Product deleted successfully',
                data: {
                    id
                }
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                status: 'failed',
                message: 'Internal Server Error'
            });
        }
    },

    store: async (req, res) => {
        try {
            const { user_id, name, price, stock, status } = req.body;
            const image = req.file;

            let imageName = null;

            if (image) {
                const targetDir = path.join(__dirname, '../../uploads');
                if (!fs.existsSync(targetDir)) {
                    fs.mkdirSync(targetDir, { recursive: true });
                }
                imageName = image.originalname;
                const target = path.join(targetDir, imageName);
                fs.renameSync(image.path, target);
            }

            const [results] = await connection.query(
                'INSERT INTO products (user_id, name, price, stock, status, image_url) VALUES (?, ?, ?, ?, ?, ?)',
                [parseInt(user_id), name, price, stock, status, `http://localhost:3000/public/${imageName}`]

            );
 
            res.json({
                status: 'success',
                message: 'Product created successfully',
                data: {
                    id: results.insertId,
                    user_id,
                    name,
                    price,
                    stock,
                    status,
                    image: imageName
                }
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                status: 'failed',
                message: 'Internal Server Error'
            });
        }
    }

    ,

    update: async (req, res) => {
        try {
             const { user_id, name, price, stock, status } = req.body;
            const { id } = req.params;
            const image = req.file;

            let imageName = null;

            if (image) {
                const targetDir = path.join(__dirname, '../../uploads');
                if (!fs.existsSync(targetDir)) {
                    fs.mkdirSync(targetDir, { recursive: true });
                }
                imageName = image.originalname;
                const target = path.join(targetDir, imageName);
                fs.renameSync(image.path, target);
            }

            const [results] = await connection.query(
                'UPDATE products SET user_id = ?, name = ?, price = ?, stock = ?, status = ?, image_url = ? WHERE id = ?',
                [parseInt(user_id), name, price, stock, status, `http://localhost:3000/public/${imageName}`, id]
            );
 
            res.json({
                status: 'success',
                message: 'Product updated successfully',
                data: {
                    id,
                    user_id,
                    name,
                    price,
                    stock,
                    status,
                    image: imageName
                }
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({
                status: 'failed',
                message: 'Internal Server Error'
            });
        }
    }
};
