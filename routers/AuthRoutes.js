// routes/authRoutes.js
import express from "express";
import {
  register,
  login,
  getSingleUser,
  getSeacthUser,
} from "../controllers/Authcontroller.js";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const excatPath = "../seejob/seejob/uploads";

const storage = multer.diskStorage({
  
  destination: (req, file, cb) => {
    cb(null,
       path.join(__dirname, "..", "seejob", "seejob", "uploads")
      );
  },

  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // specify the filename format
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post(
  "/register",
  upload.fields([{ name: "resume" }, { name: "image" }]),
  register
);

router.post("/login", login);
router.get("/user/:id", getSingleUser);
router.get("/search", getSeacthUser);

export default router;
