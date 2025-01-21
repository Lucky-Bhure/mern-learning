const express = require("express");
const allUsersData = require("../controllers/admin-users");
const allContactData = require("../controllers/admin-contacts");
const userMiddleware = require("../middleware/user-middleware");
const adminMiddleware = require("../middleware/admin-middleware");
const router = express.Router();


router.route("/users").get(userMiddleware, adminMiddleware, allUsersData);
router.route("/contacts").get(userMiddleware, adminMiddleware, allContactData);

module.exports = router;