const app = require('../app');
const { connectMongoDB } = require('../config/mongodb');
const { connectMongoose } = require('../config/mongoose');

async function initializeDatabase() {
    await connectMongoDB();
    await connectMongoose();
    console.log('Database terhubung/diverifikasi');
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