const express = require("express");
const router = express.Router();

const {
	verifyAccessToken,
	verifyAdminRole,
	verifyUserRole,
} = require("../helpers/jwt_helper");
const {
	register,
	getAllUsers,
	getUser,
	deleteUser,
	updateUser,
} = require("../controllers/users");
// get all users
router.route("/").get(verifyAdminRole, getAllUsers);
router.route("/:id").get(verifyUserRole, getUser);

router.route("/add").post(verifyAdminRole, register);
router.route("/delete/:id").delete(verifyAdminRole, deleteUser);
router.route("/update/:id").patch(verifyUserRole, updateUser);
module.exports = router;
