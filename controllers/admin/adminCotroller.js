import Employer from '../../models/employer/employerModel.js';
import JobListing from '../../models/jobs/jobsModel.js';
import Register from '../../models/user/authModel.js';

export const currentUsers = async (req, res) => {
  try {
    // Await the countDocuments method to properly handle the promise
    const jobCount = await Register.countDocuments();
    const userData = await Register.find().sort({data : 1 });
 
     console.log(userData)
     
    if (jobCount === 0) {
      res.status(200).send({
        success: true,
        message: 'No jobs are available',
      });
    } else {
      res.status(200).send({
        success: true,
        jobs: jobCount,
        userData : userData , 
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    
    });
  }
};


export const currentJobs = async (req, res) => {
    try {
      // Await the countDocuments method to properly handle the promise
      const jobCount = await JobListing.countDocuments();
      const jobData = await JobListing.find().sort({ date: 1 });

      if (jobCount === 0) {
        res.status(200).send({
          success: true,
          message: 'No jobs are available',
        });
      } else {
        res.status(200).send({
          success: true,
          jobs: jobCount,
          jobData : jobData ,
        });
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Error in getting number of jobs',
      });
    }
  };
  
  
  
  export const currentEmlpoyers = async (req, res) => {
    try {
      // Await the countDocuments method to properly handle the promise
      const jobCount = await Employer.countDocuments();
        
      if (jobCount === 0) {
        res.status(200).send({
          success: true,
          message: 'No jobs are available',
        });
      } else {
        res.status(200).send({
          success: true,
          jobs: jobCount,
        });
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Error in getting number of jobs',
      });
    }
  };
  
  
  

  export const getTodaysJobPostings = async (req, res) => {
      try {
          // Get the start and end of today's date
          const startOfToday = new Date();
          startOfToday.setHours(0, 0, 0, 0);
          
          const endOfToday = new Date();
          endOfToday.setHours(23, 59, 59, 999);
  
          // Query the database for jobs posted today
          const todaysJobs = await JobListing.countDocuments({
              createdAt: {
                  $gte: startOfToday,
                  $lt: endOfToday
              }
          });
  
          res.status(200).send({
              success: true,
              jobs: todaysJobs
          });

      } catch (error) {
          res.status(500).send({
              success: false,
              message: "Error in getting today's job postings",
              error: error.message
          });
      }
  };
  