const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
// potentially add auth middleware here later
// const { protect } = require('../middleware/authMiddleware');

router.post('/generate', aiController.generateContent);
router.post('/chat', aiController.chat);

module.exports = router;
