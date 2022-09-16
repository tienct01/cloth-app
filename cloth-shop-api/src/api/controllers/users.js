const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { isValidObjectId } = require("mongoose");

const register = async function (req, res, next) {
	const { username, email, password, isadmin } = req.body;
	let user = new User({
		username: username.toLowerCase(),
		email: email.toLowerCase(),
		password: password,
		isadmin,
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
			user.save()
				.then((user) => {
					res.status(201).json(user);
				})
				.catch((err) => {
					next(err);
				});
		})
		.catch((err) => next(err));
};
const getAllUsers = async function (req, res, next) {
	try {
		let users = await User.find({}).sort({ createdAt: -1 });
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};
const getUser = async (req, res, next) => {
	try {
		const userId = req.params["id"];
		if (!isValidObjectId(userId))
			return res.status(404).json({
				message: "Invalid id",
			});
		let user = await User.findById(userId);

		if (!user) return res.status(404).json({ message: "User not found" });
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};
const deleteUser = async function (req, res, next) {
	try {
		const userId = req.params["id"];
		if (!isValidObjectId(userId))
			return res.status(404).json({
				message: "Invalid id",
			});
		let deletedUser = await User.findByIdAndDelete(userId);
		if (!deletedUser)
			return res.status(404).json({ message: "User not found" });
		res.status(200).json(deletedUser);
	} catch (error) {
		next(error);
	}
};
const updateUser = async function (req, res, next) {
	try {
		const userId = req.params["id"];
		if (!isValidObjectId(userId))
			return res.status(404).json({ message: "Invalid Id" });

		const { password } = req.body;

		if (!password)
			return res.status(400).json({ message: "Invalid password" });

		new User({ password: "password" })
			.validate("password")
			.then(async () => {
				let cryptedPassword = await bcrypt.hash(password, 10);
				let updatedUser = await User.findByIdAndUpdate(userId, {
					password: cryptedPassword,
				});
				if (!updatedUser)
					return res.status(404).json({ message: "User not found" });
				res.status(200).json(updatedUser);
			})
			.catch((err) => next(err));
	} catch (error) {}
};
module.exports = { register, getAllUsers, getUser, deleteUser, updateUser };
