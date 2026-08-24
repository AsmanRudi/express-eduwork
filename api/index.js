const app = require('../app');
const { connectMongoDB } = require('../config/mongodb');
const { connectMongoose } = require('../config/mongoose');

let isConnected = false;

async function initializeDatabase() {
    if (isConnected) {
        return;
    }

    await connectMongoDB();
    await connectMongoose();

    isConnected = true;

    console.log('Database berhasil terhubung');
}

module.exports = async (req, res) => {
    try {
        await initializeDatabase();

        return app(req, res);
    } catch (error) {
        console.error('Vercel Function Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Database connection failed',
            error: process.env.NODE_ENV === 'development'
                ? error.message
                : undefined
        });
    }
};