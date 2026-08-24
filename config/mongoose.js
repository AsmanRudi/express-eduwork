const mongoose = require('mongoose');

async function connectMongoose () {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Mongoose berhasil terhubung...");
    } catch (error) {
        console.error("Mongoose gagal terhubung: ", error);
        process.exit(1);
    }
}

module.exports = { connectMongoose };