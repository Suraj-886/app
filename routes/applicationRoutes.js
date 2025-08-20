const express = require('express');
const applicationController = require('../controllers/applicationController');

const router = express.Router();

// Create a new application
router.post('/', applicationController.createApplication);

// Get all applications
router.get('/', applicationController.getAllApplications);

// Get single application by ID
router.get('/:id', applicationController.getApplicationById);

// Delete an application
router.delete('/:id', applicationController.deleteApplication);

module.exports = router;
