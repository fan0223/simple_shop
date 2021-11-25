const express = require('express');
const router = express.Router();
const { signinForm, signup, signin } = require('../controllers/users');

router.get('/', signinForm);
router.post('/signin', signin);
router.post('/signup', signup);

module.exports = router;