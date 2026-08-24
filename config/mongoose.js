const mongoose = require('mongoose');

async function connectMongoose() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log('Mongoose berhasil terhubung...');
    } catch (error) {
        console.error('Mongoose gagal terhubung:', error);
        throw error;
    }
}

module.exports = { connectMongoose };