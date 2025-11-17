import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const ConnectDB = async () => {

    const MONGO_URI = process.env.MONGO_URL;

    if (!MONGO_URI) {
        console.error("MongoDB connection string missing in .env");
        process.exit(1);
    }

    mongoose.set("strictQuery", true); 

    const options = {
        maxPoolSize: 30,
        minPoolSize: 5,
        serverSelectionTimeoutMS: 8000,
        socketTimeoutMS: 60000,
        connectTimeoutMS: 10000,
        heartbeatFrequencyMS: 10000,
    };

    try {
        const conn = await mongoose.connect(MONGO_URI, options);

        console.log(
            `MongoDB Connected: ${conn.connection.host} / ${conn.connection.name}`
        );

        mongoose.connection.on("disconnected", () => {
            console.warn("MongoDB disconnected Trying to reconnect...");
        });

        mongoose.connection.on("reconnected", () => {
            console.log("MongoDB reconnected successfully");
        });

        mongoose.connection.on("error", (err) => {
            console.error("MongoDB error:", err);
        });

    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        setTimeout(ConnectDB, 5000);
    }

};

export default ConnectDB;