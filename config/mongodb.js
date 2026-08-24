const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

let db;

async function connectMongoDB () {
    try {
        await client.connect();
        
        db = client.db('eduwork-native');

        console.log('Server Terhubung ke MongoDB');
    }
    catch (error) {
        console.error('MongoDB Gagal Terhubung:', error);
        process.exit(1);
    }
}

function getDB () {
    if (!db) {
        throw new Error('MongoDB belum terhubung. Pastikan connectMongoDB() telah dipanggil.');
    }
    return db;
}

module.exports = { 
    connectMongoDB,
    getDB
 };



