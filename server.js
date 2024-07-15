// server.js
import express from "express";
import connectDB from "./db/config.js";
import authRoutes from "./AuthRoutes.js";
import employerRoutes from "./routers/employer/employerRoutes.js";
import jobsRoutes from "./routers/jobs/jobsRouter.js";
import adminRoutes from "./routers/admin/adminRoutes.js";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";

const app = express();

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json());

app.use("/uploads", express.static(path.join("seejob", "seejob", "uploads")));

app.use(morgan("dev"));

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/employerauth", employerRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
