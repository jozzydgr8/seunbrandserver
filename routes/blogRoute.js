const router = require('express').Router();
const {getBlog} = require('../controller/blogController');

router.get('/', getBlog);

module.exports = router;