const jwt = require("jsonwebtoken");

const signAccessToken = function (id) {
	return new Promise((resolve, reject) => {
		jwt.sign(
			{ id },
			process.env.SECRET_ACCESS_TOKEN,
			{
				expiresIn: "30d",
			},
			(err, token) => {
				if (err) reject(err);
				resolve(token);
			}
		);
	});
};
const signRefreshToken = function (id) {
	return new Promise((resolve, reject) => {
		jwt.sign(
			{ id },
			process.env.SECRET_REFRESH_TOKEN,
			{
				expiresIn: "2d",
			},
			(err, token) => {
				if (err) reject(err);
				resolve(token);
			}
		);
	});
};
const verifyUserRole = async function (req, res, next) {
	verifyAccessToken(req, res, () => {
		try {
			const user = req.data.id;
			if (user._id === req.params.id || user.isadmin) {
				next();
			} else {
				return res.status(403).json({ message: "Unauthorize" });
			}
		} catch (error) {
			next(err);
		}
	});
};
const verifyAccessToken = async function (req, res, next) {
	const token =
		req.body.token || req.query.token || req.headers["x-access-token"];
	if (!token) return res.status(403).json({ message: "Unauthorize" });
	try {
		req.data = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
		next();
	} catch (error) {
		res.status(400).json({ message: "Invalid token" });
	}
};
const verifyAdminRole = async function (req, res, next) {
	verifyAccessToken(req, res, () => {
		const user = req.data.id;
		if (!user.isadmin)
			return res.status(403).json({
				message: "Admin resources. Access denied",
			});
		next();
	});
};

module.exports = {
	signAccessToken,
	signRefreshToken,
	verifyAccessToken,
	verifyAdminRole,
	verifyUserRole,
};
