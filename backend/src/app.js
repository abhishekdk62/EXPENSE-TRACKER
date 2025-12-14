import express from "express";
import cors from "cors";
import dotenv from 'dotenv';

import expenseRoutes from "./routes/expenseRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
dotenv.config()
const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  })
)

app.use(express.json());

app.use("/api/expenses", expenseRoutes);

app.use(errorHandler);

export default app;
