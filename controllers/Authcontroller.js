// controllers/authController.js
import Register from "../models/user/authModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";

export const register = async (req, res) => {
  try {
    if (!req.files) {
      console.log("Resume or image file is missing");
      return res.status(400).json({ message: "Resume and image are required" });
    }

    const imagePath = req.files.image[0].path;
    const resumePath = req.files.resume[0].path;

    const {
      username,
      email,
      phone,
      location,
      minExperience,
      maxExperience,
      skills,
      industry,
      description,
      password,
      company,
      salary,
      period,
      age,
      language,
    } = req.body;

    // // console.log("Received data:", req.body);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Register({
      username,
      password: hashedPassword,
      email,
      phone,
      location,
      minExperience,
      maxExperience,
      skills,
      industry,
      image: imagePath,
      resume: resumePath,
      description,
      company,
      salary,
      period,
      age,
      language,
      role: "user",
    });

    // console.log("Created new user instance:", newUser);

    // const existingUser = await Register.findOne({ email });

    // if (existingUser) {
    //   console.log("User already exists");
    //   return res.status(300).json({ message: "User is already created" });
    // }

    // const user = await Register.create(req.body);
    await newUser.save();

    // console.log("User saved successfully:", user);

    res.status(201).json({
      success: true,
      message: "user created successfully",
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      success: false,
      message: `error while creating user ${err.message} `,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Register.findOne({ email, role: "user" });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, "yourSecretKey", {
      expiresIn: "1h",
    });

    res.json({
      success: true,
      token,
    });
  } catch (err) {
    res.status(500).json({
      success: false,

      message: err.message,
    });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await Register.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    console.log("job", user);
    res.json({ success: true, user });
  } catch (error) {
    console.error("Error fetching job details:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getSeacthUser = async (req, res) => {
  try {
    const { role, location, skills, experienceMax, experienceMin } = req.query;

    const filter = {};

    if (role) {
      filter.industry = new RegExp(role, "i"); // Case-insensitive regex for 'role'
    }

    if (location) {
      filter.location = new RegExp(location, "i");
    }

    if (skills) {
      filter.skills = new RegExp(skills, "i");
    }

    if (experienceMax) {
      filter.maxExperience = { $lte: experienceMax };
    }

    if (experienceMin) {
      filter.minExperience = { $gte: experienceMin };
    }

    const user = await Register.find(filter);

    if (user.length > 0) {
      return res.status(200).send({
        success: true,
        user,
      });
    } else {
      return res.status(404).send({
        success: true,
        message: "no user found mathing your criteria",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in the user job API",
      error: error.message,
    });
  }
};
