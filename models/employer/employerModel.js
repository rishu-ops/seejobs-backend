import mongoose from "mongoose";

const employerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  password : {
     type : String ,
     required : true ,
  } , 
  state: {
    type: String,
    required: true
  },
  currentCompanyName: {
    type: String,
    required: true
  },
  currentDesignation: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  totalExpirence : {
   
    type : String ,
    required : true ,

  } ,

  hiringLevel: {
    type: String,
    required: true
  },
  skillsIhireFor: {
    type: String,
    required: true
  },
  location: {
    type: String ,
    required : true ,
  },

  Description: {
    type: String,
    
  } ,
  industryYear : {
     type : Number 
  } ,
  role: {
    type: String,
    enum: ['user', 'employer'],
    
  } ,
} , 
   {
    timestamps: true // Add timestamps option here
});


const Employer = mongoose.model('Employer', employerSchema);

export default  Employer;
