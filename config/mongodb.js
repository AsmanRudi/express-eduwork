const { MongoClient } = require('mongodb');

let client;
let db;

async function connectMongoDB () {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error('MONGODB_URI is not defined in environment variables');
    }

    if (client) {
        if (!client.topology || (client.topology.isDestroyed && client.topology.isDestroyed())) {
            console.warn('MongoDB topology closed or missing. Reconnecting...');
            client = null;
            db = null;
        }
    }

    if (db) return;

    try {
        if (!client) {
            client = new MongoClient(uri);
            await client.connect();
        }
        
        db = client.db('eduwork-native');

        console.log('Server Terhubung ke MongoDB Native');
    }
    catch (error) {
        console.error('MongoDB Native Gagal Terhubung:', error);
        throw error;
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



