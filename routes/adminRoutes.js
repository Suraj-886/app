const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.post('/register', adminController.register);
router.post('/login', adminController.login);
router.post('/change-password', auth, adminController.changePassword);


module.exports = router;
