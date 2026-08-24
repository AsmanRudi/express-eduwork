const mongoose = require('mongoose');

async function connectMongoose() {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error('MONGODB_URI is not defined in environment variables');
    }

    try {
        await mongoose.connect(uri);

        console.log('Mongoose berhasil terhubung...');
    } catch (error) {
        console.error('Mongoose gagal terhubung:', error);
        throw error;
    }
}

module.exports = { connectMongoose };