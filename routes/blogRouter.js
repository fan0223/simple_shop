const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { getBlog, addBlog, createBlog } = require('../controllers/blogs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

router.get('/', getBlog);
router.get('/addBlog', auth, addBlog);
router.post('/addBlog', upload.single('image'), createBlog);

module.exports = router;