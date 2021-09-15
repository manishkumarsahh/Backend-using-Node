const express = require('express');

const router = express.Router();
const passport = require('passport');

const postsApi = require("../../../controllers/api/v1/posts_api");

router.get('/', passport.authenticate('jwt', {session: false}) , postsApi.getPosts);
 



module.exports = router;