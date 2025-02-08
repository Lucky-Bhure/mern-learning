const express = require("express");
const { allUsersData, getUserDataById, updateUserDataById } = require("../controllers/admin-users");
const { allContactData, deleteContactById } = require("../controllers/admin-contacts");
const userMiddleware = require("../middleware/user-middleware");
const adminMiddleware = require("../middleware/admin-middleware");
const deleteUserById = require("../controllers/admin-delete");
const allCoursesData = require("../controllers/admin-courses")
const router = express.Router();

// Admin User Route
router.route("/users").get(userMiddleware, adminMiddleware, allUsersData);
router.route("/users/edit/:id").get(userMiddleware, adminMiddleware, getUserDataById);
router.route("/users/edit/:id").patch(userMiddleware, adminMiddleware, updateUserDataById);
router.route("/users/delete/:id").delete(userMiddleware, adminMiddleware, deleteUserById);

// Admin Contact Route
router.route("/contacts").get(userMiddleware, adminMiddleware, allContactData);
router.route("/contacts/delete/:id").delete(userMiddleware, adminMiddleware, deleteContactById);

// Admin Course Route
router.route("/courses").get(userMiddleware, adminMiddleware, allCoursesData);


module.exports = router;