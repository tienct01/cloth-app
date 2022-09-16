const Order = require("../models/order.model");

const add = async function (req, res, next) {
	try {
		let order = new Order({
			...req.body,
		});
		let newOrder = await order.save();
		res.status(200).json(newOrder);
	} catch (error) {
		next(error);
	}
};

const update = async function (req, res, next) {
	try {
		const order = await Order.findByIdAndUpdate(
			req.params.id,
			{
				$set: { ...req.body },
			},
			{ new: true }
		);
		if (!order) return res.status(404).json({ message: "Order not found" });
		res.status(200).json(order);
	} catch (error) {
		next(error);
	}
};
const getOrders = async function (req, res, next) {
	try {
		let orders = await Order.find().sort({ createdAt: -1 });
		res.status(200).json(orders);
	} catch (error) {
		next(error);
	}
};
const del = async function (req, res, next) {
	try {
		let id = req.params.id;
		let order = await Order.findByIdAndDelete(id);

		if (!order) return res.status(404).json({ message: "Order not found" });
		res.status(200).json(order);
	} catch (error) {
		next(error);
	}
};
const getOrder = async function (req, res, next) {
	try {
		let id = req.params.id;
		let order = await Order.find({ userId: id });

		if (!order) return res.status(404).json({ message: "Order not found" });
		res.status(200).json(order);
	} catch (error) {
		next(error);
	}
};
const getIncome = async function (req, res, next) {
	const thisMonth = new Date();
	thisMonth.setDate(1);
	try {
		const income = await Order.aggregate([
			{ $match: { createdAt: { $gte: thisMonth } } },
			{
				$project: {
					month: { $month: "$createdAt" },
					sales: "$amount",
				},
			},
			{
				$group: {
					_id: "$month",
					total: { $sum: "$sales" },
				},
			},
		]);
		res.status(200).json(income);
	} catch (error) {}
};
module.exports = {
	add,
	del,
	getOrder,
	getOrders,
	update,
	getIncome,
};
