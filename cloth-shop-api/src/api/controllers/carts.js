const Cart = require("../models/cart.model");

const add = async function (req, res, next) {
	try {
		let cart = new Cart({
			...req.body,
		});
		let newCart = await cart.save();
		res.status(200).json(newCart);
	} catch (error) {
		next(error);
	}
};

const update = async function (req, res, next) {
	try {
		const updatedCart = await Cart.findOneAndUpdate(
			{ userId: req.params.id },
			req.body
		);
		if (!updatedCart)
			return res.status(404).json({ message: "Cart not found" });
		res.status(200).json(updatedCart);
	} catch (error) {
		next(error);
	}
};
const getCarts = async function (req, res, next) {
	try {
		let carts = await Cart.find();
		res.status(200).json(carts);
	} catch (error) {
		next(error);
	}
};
const del = async function (req, res, next) {
	try {
		let cartId = req.params.id;
		let deletedCart = await Cart.findByIdAndDelete(cartId);

		if (!deletedCart)
			return res.status(404).json({ message: "Cart not found" });
		res.status(200).json(deletedCart);
	} catch (error) {
		next(error);
	}
};
const getCart = async function (req, res, next) {
	try {
		let userId = req.params.id;
		let cart = await Cart.find({ userId: userId });
		if (!cart) return res.status(404).json({ message: "Cart not found" });
		res.status(200).json(cart[0]);
	} catch (error) {
		next(error);
	}
};
module.exports = {
	add,
	del,
	getCart,
	getCarts,
	update,
};
