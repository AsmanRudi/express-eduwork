require("dotenv").config();

const app = require("./app");

const { connectMongoDB } = require("./config/mongodb");

const { connectMongoose } = require("./config/mongoose");

const PORT = process.env.PORT || 5000;

async function startServer() {
    try{
        await connectMongoDB();

        await connectMongoose();

        app.listen(PORT, () => {
            console.log(`Server berjalan di http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Server Gagal Lagi Dijalankan", error);
        process.exit(1);
    }
}

startServer();

