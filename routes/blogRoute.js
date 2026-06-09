const router = require('express').Router();
const {getBlog, createBlog, deleteBlog, updateBlog} = require('../controller/blogController');
const multerUpload = require('../config/multerConfig');

router.get('/', getBlog);
router.patch('/:id', multerUpload.single('image'), updateBlog);
router.post('/', multerUpload.single('image'), createBlog);
router.delete('/:id', deleteBlog);

module.exports = router;