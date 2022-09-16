const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { signAccessToken, signRefreshToken } = require("../helpers/jwt_helper");

const register = async function (req, res, next) {
	const { username, email, password } = req.body;
	let user = new User({
		username: username.toLowerCase(),
		email: email.toLowerCase(),
		password: password,
	});
	// Check the password before hash
	user.validate()
		.then(async () => {
			// Check is unique username
			let oldUser = await User.findOne({ username: username }).catch(
				(err) => {
					next(err);
				}
			);
			if (oldUser)
				return res.status(400).json({
					message: "Username is already existed",
				});
			// Check is unique email
			oldUser = await User.findOne({ email: email }).catch((err) => {
				next(err);
			});
			if (oldUser)
				return res.status(400).json({
					message: "Email is already existed",
				});

			// Hash password
			let cryptedPassword = await bcrypt.hash(password, 10);
			user.password = cryptedPassword;
			const accessToken = await signAccessToken(user);
			user.save()
				.then((user) => {
					res.status(201).json({
						userId: user._id,
						username: user.username,
						email: user.email,
						isadmin: user.isadmin,
						accessToken: accessToken,
					});
				})
				.catch((err) => {
					next(err);
				});
		})
		.catch((err) => next(err));
};
const login = async function (req, res, next) {
	try {
		const { username, password } = req.body;
		if (!username) {
			return res.status(400).json({ message: "Username is empty" });
		}
		if (!password) {
			return res.status(400).json({ message: "Password is empty" });
		}
		// Find user
		let user = await User.findOne({
			username: username.toLowerCase().trim(),
		});
		if (!user)
			return res
				.status(400)
				.json({ message: "Username or password is wrong" });
		// Check password
		let success = await bcrypt
			.compare(password, user.password)
			.catch((err) => {
				next(err);
			});
		if (!success) {
			return res
				.status(400)
				.json({ message: "Username or password is wrong" });
		}
		const accessToken = await signAccessToken(user);
		res.status(200).json({
			userId: user._id,
			username: user.username,
			email: user.email,
			isadmin: user.isadmin,
			accessToken: accessToken,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = { register, login };
