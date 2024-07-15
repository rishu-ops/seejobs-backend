// models/Register.js
import mongoose from "mongoose";

const RegisterSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    phone: String,
    location: String,
    minExperience: Number,
    maxExperience: Number,
    skills: String,
    industry: String,
    description: String,
    password: String,
    image: String,
    resume: String,
    company: String,
    salary: String,
    period: Number,
    age: Number,
    language: [String],
    qualification: String,

    role: {
      type: String,
      enum: ["user", "employer"],
      default: "user", // Default role is user
    },
  },

  {
    timestamps: true, // Add timestamps option here
  }
);

const Register = mongoose.model("Register", RegisterSchema);

export default Register;
