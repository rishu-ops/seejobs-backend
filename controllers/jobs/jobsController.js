// controllers/jobController.js
import JobListing from "../../models/jobs/jobsModel.js";

// Controller function to save a new job listing
export const saveJobListing = async (req, res) => {
  try {
    const jobData = req.body;

    // Create a new job listing using the model
    const user = req.email;

    //  const email = JobListing.find({user })

    //  if ( email ) {

    const newJobListing = await JobListing.create(jobData);

    res.status(201).json({
      success: true,
      data: newJobListing,
      message: "job has been posted successfully",
    });

    // }
    // res.status(400).json({ success: false, message: "please register email is not valid" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    // Query the database to get all jobs
    const jobs = await JobListing.find();

    // Send the jobs as a JSON response
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    // If there's an error, send an error response
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await JobListing.findById(jobId);
    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: "Job not found", job });
    }

    console.log("job", job);
    res.json({ success: true, job });
  } catch (error) {
    console.error("Error fetching job details:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getSearchJobs = async (req, res) => {
  try {
    // Extract parameters from the request query
    const {
      lookingFor,
      youLiveAt,
      role,
      locality,
      salaryMin,
      salaryMax,
      experience,
      education,
      workShift,
      jobType,
      category,
      skills,
    } = req.query;

    // Construct the filter object
    const filter = {};

    if (lookingFor) {
      filter.jobTitle = new RegExp(lookingFor, "i"); // Case-insensitive regex for 'jobTitle'
    }

    if (youLiveAt) {
      filter.locality = new RegExp(youLiveAt, "i"); // Case-insensitive regex for 'locality'
    }

    if (role) {
      filter.role = new RegExp(role, "i"); // Case-insensitive regex for 'role'
    }

    if (locality) {
      filter.locality = new RegExp(locality, "i"); // Case-insensitive regex for 'location'
    }

    if (category) {
      filter.category = new RegExp(category, "i"); // Case-insensitive regex for 'category'
    }

    if (salaryMin || salaryMax) {
      if (salaryMin) {
        filter["monthlySalary.min"] = { $lte: parseFloat(salaryMin) }; // Minimum salary condition
      }
      if (salaryMax) {
        filter["monthlySalary.max"] = { $gte: parseFloat(salaryMax) }; // Maximum salary condition
      }
    }

    if (experience) {
      filter.experience = experience;
    }

    if (education) {
      filter.education = { $in: education.split(",") }; // Split comma-separated values
    }

    if (workShift) {
      filter.workShift = { $in: workShift.split(",") }; // Split comma-separated values
    }

    if (jobType) {
      filter.jobType = { $in: jobType.split(",") }; // Split comma-separated values
    }

    if (skills) {
      filter.skills = { $in: skills.split(",") }; // Split comma-separated values
    }

    console.log(filter);

    // Use Mongoose to search for jobs matching the criteria
    const jobs = await JobListing.find(filter);

    // Check if any jobs are found
    if (jobs.length > 0) {
      // Send the search results as the response
      return res.status(200).send({
        success: true,
        jobs,
      });
    } else {
      // If no jobs found, send a 404 status response with a message
      return res.status(404).send({
        success: true,
        message: "No jobs found matching your criteria",
      });
    }
  } catch (error) {
    // Log the error to the console for debugging purposes
    console.error(error);

    // If there's an error, send a 500 status response with an error message
    return res.status(500).send({
      success: false,
      message: "Error in the search job API",
      error: error.message,
    });
  }
};

export const getSimilarJobs = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await JobListing.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    // Define the criteria for similar jobs
    const similarJobs = await JobListing.find({
      category: job.category,
      // role: job.role,
    }).limit(6); // Limit the number of similar jobs returned

    res.json({ success: true, similarJobs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
