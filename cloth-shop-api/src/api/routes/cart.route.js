const express = require("express");
const router = express.Router();

const { add, del, getCart, getCarts, update } = require("../controllers/carts");
const { verifyAdminRole, verifyUserRole } = require("../helpers/jwt_helper");

router.route("/add").post(verifyUserRole, add);
router.route("/update/:id").patch(verifyUserRole, update);
router.route("/").get(verifyAdminRole, getCarts);
router.route("/delete/:id").delete(verifyUserRole, del);
router.route("/:id").get(verifyUserRole, getCart);
module.exports = router;
