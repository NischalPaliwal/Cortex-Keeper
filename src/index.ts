import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import contentRoutes from "./routes/contentRoutes";
import shareRoutes from "./routes/shareRoutes";

const app = express();
dotenv.config();

(async () => {
    await mongoose.connect("mongodb+srv://paliwalnischal:nischalpaliwal7@second-brain-project.sk26q.mongodb.net/cortex-keeper").
    then(() => {
        console.log("Connected to MongoDB");
    }).catch((error) => {
        console.log("Error connecting to MongoDB:", error);
    })
})();

const port = process.env.PORT;

app.use('/health-check', (req: Request, res: Response) => {
    res.json({
        status: "OK",
    });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/content', contentRoutes);
app.use('api/v1', shareRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});