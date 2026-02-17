import cors from "cors";
import express, { type Request, type Response } from "express";

const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "Hello from the Skill Stake backend! 👋" });
});

export default app;
