const express = require('express');
const router = express.Router();

const SavePostController = require('../controllers/SavePostController');

router.post('/click', SavePostController.handleClick);
router.get('/user/:userId', SavePostController.getSavedPostsByUserId);

module.exports = router;