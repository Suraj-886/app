const Application = require('../models/Application');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB limit
}).fields([
  { name: 'itrCertificate', maxCount: 1 },
  { name: 'pensionDocument', maxCount: 1 },
  { name: 'signature', maxCount: 1 }
]);


const handleFileUpload = (req, res) => {
  console.log("handleFileUpload--->")
  return new Promise((resolve, reject) => {
    upload(req, res, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const uuidv4 = require('../utils/uuid');

exports.createApplication = async (req, res) => {
  console.log("code run --->")
  try {
    await handleFileUpload(req, res);

    const formData = JSON.parse(req.body.formData);

    // Handle file paths
    if (req.files) {
      if (req.files['itrCertificate']) {
        formData.itrCertificate = req.files['itrCertificate'][0].filename;
      }
      if (req.files['pensionDocument']) {
        formData.pensionDocument = req.files['pensionDocument'][0].filename;
      }
      if (req.files['signature']) {
        formData.signature = req.files['signature'][0].filename;
      }
    }

   
    formData.applicationNumber = `${uuidv4()}`;

    const application = new Application(formData);
    await application.save();

    res.status(201).json({
      success: true,
      data: application,
      applicationNumber: application.applicationNumber, 
      message: 'Application submitted successfully'
    });
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting application',
      error: error.message
    });
  }
};


exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: applications
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching applications',
      error: error.message
    });
  }
};


exports.getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.status(200).json({
      success: true,
      data: application
    });
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching application',
      error: error.message
    });
  }
};


exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

  
    const filesToDelete = [
      application.itrCertificate,
      application.pensionDocument,
      application.signature
    ].filter(Boolean);

    filesToDelete.forEach(file => {
      const filePath = path.join('uploads', file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    res.status(200).json({
      success: true,
      message: 'Application deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting application',
      error: error.message
    });
  }
};