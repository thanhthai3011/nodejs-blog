const express = require('express');
const router = express.Router();

const siteController = require('../resources/app/controllers/SiteController');

router.get('/search', siteController.search);
router.get('/', siteController.home);

module.exports = router;
