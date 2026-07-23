const router = require("express").Router();
const Product = require("./model");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const path = require("path");



router.post("/product", upload.single('image'), async (req, res) => {
    const { users_id, name, price, stock, status } = req.body;
    const image = req.file;
    if (image) {
        const targetDir = path.join(__dirname, '../../uploads');
                        if (!fs.existsSync(targetDir)) {
                            fs.mkdirSync(targetDir, { recursive: true });
                        }
    try {
        const result = await Product.create({users_id, name, price, stock, status, image_url: `http://localhost:3000/public/${imageName}`});
        res.send(result);
    } catch (error) {
        res.send(error);
    }
    
    }
}

);


module.exports = router;
