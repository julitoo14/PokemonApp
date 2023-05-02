const express = require('express');
const router = express.Router();
const authHttpHandler = require('./auth.http');


router.route('/login')
    .post(authHttpHandler.loguear)

router.route('/register')
    .post(authHttpHandler.register)

exports.router = router;