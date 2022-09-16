const express = require("express");
const router = express.Router();

const {
	addProduct,
	updateProduct,
	getProducts,
	deleteProduct,
	getProduct,
} = require("../controllers/products");
const { verifyAdminRole } = require("../helpers/jwt_helper");

router.route("/add").post(verifyAdminRole, addProduct);
router.route("/update/:id").patch(verifyAdminRole, updateProduct);
router.route("/").get(getProducts);
router.route("/delete/:id").delete(deleteProduct);
router.route("/:id").get(getProduct);
module.exports = router;
