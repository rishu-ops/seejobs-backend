import mongoose from "mongoose";

const { Schema, model } = mongoose;

const jobListingSchema = new Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    monthlySalary: {
      min: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      },
    },
    experience: {
      min: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      },
    },
    city: {
      type: String,
      required: true,
    },
    locality: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    hiringForCompanies: {
      type: [String], // Array of strings for multiple companies
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    education: {
      type: [String],
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true, // Add timestamps option here
  }
);

const JobListing = model("JobListing", jobListingSchema);

export default JobListing;
