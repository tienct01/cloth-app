const express = require("express");
const authRouter = express.Router();

const { register, login } = require("../controllers/auth");
const { verifyAccessToken } = require("../helpers/jwt_helper");
authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.get("/profile", (req, res, next) => {
	verifyAccessToken(req, res, () => {
		res.status(200).json(req.data.id);
	});
});
module.exports = authRouter;
