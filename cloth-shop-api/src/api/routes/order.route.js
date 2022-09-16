const express = require("express");
const router = express.Router();

const {
	add,
	del,
	getOrder,
	getOrders,
	update,
	getIncome,
} = require("../controllers/orders");
const {
	verifyAdminRole,
	verifyUserRole,
	verifyAccessToken,
} = require("../helpers/jwt_helper");

router.route("/add").post(verifyAdminRole, add);
router.route("/update/:id").patch(verifyAdminRole, update);
router.route("/delete/:id").delete(verifyUserRole, del);
router.route("/income").get(getIncome);
router.route("/:id").get(verifyUserRole, getOrder);
router.route("/").get(getOrders);

module.exports = router;
