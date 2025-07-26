import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser"

import initializeRoutes from "./router/index.js";

const initialize = (app) => {
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    }));
    app.use((req, res, next) => {
        res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
        res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none');
        res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');  // This helps with cross-origin resources
        next();
      });
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    mongoose.connect(process.env.MONGO_CONNECTION)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
        console.error("Failed to connect to MongoDB:", err.message);
        process.exit(1); // Exit the app if database connection fails
    });

    initializeRoutes(app);
};

export default initialize;
