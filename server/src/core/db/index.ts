import mongoose from "mongoose";

// Connect to MongoDB
export function connectTerrainDb() {
    mongoose.connect(process.env.MONGO_CONNECTION_STRING!, {
        dbName: process.env.MONGO_TERRAIN_GAME_DB,
    });

    const db = mongoose.connection;

    db.on("error", (error) => {
        console.error(error);
    });

    db.once("open", () => {
        console.log("Connected to MongoDB");
    });
}
