const { default: mongoose } = require("mongoose");
const Product = require("../models/product.model");
const addProduct = async function (req, res, next) {
	try {
		let product = new Product(req.body);
		product
			.save()
			.then((addedProduct) => {
				res.status(201).json(addedProduct);
			})
			.catch((err) => {
				next(err);
			});
	} catch (error) {
		next(error);
	}
};

const updateProduct = async function (req, res, next) {
	try {
		const updatedProduct = await Product.findByIdAndUpdate(
			req.params.id,
			{
				$set: { ...req.body },
			},
			{ new: true }
		);
		if (!updateProduct)
			return res.status(404).json({ message: "Product not found" });
		res.status(200).json(updatedProduct);
	} catch (error) {
		next(error);
	}
};
const getProducts = async function (req, res, next) {
	try {
		const qNew = req.query.new;
		const qCategory = req.query.category;
		const qIds = req.query.productId;
		let products;
		if (qNew) {
			products = await Product.find()
				.sort({
					createdAt: -1,
				})
				.limit(3);
		} else if (qCategory) {
			products = await Product.find({
				categories: {
					$in: [qCategory],
				},
			});
		} else if (qIds) {
			products = await Product.find({
				_id: {
					$in: [...qIds].map((value) => {
						return mongoose.Types.ObjectId(value);
					}),
				},
			});
		} else {
			products = await Product.find();
		}
		res.status(200).json(products);
	} catch (error) {
		next(error);
	}
};
const deleteProduct = async function (req, res, next) {
	try {
		let productId = req.params.id;
		let deletedProduct = await Product.findByIdAndDelete(productId);

		if (!deletedProduct)
			return res.status(404).json({ message: "Product not found" });
		res.status(200).json(deletedProduct);
	} catch (error) {
		next(error);
	}
};
const getProduct = async function (req, res, next) {
	try {
		let productId = req.params.id;
		let product = await Product.findById(productId);

		if (!product)
			return res.status(404).json({ message: "Product not found" });
		res.status(200).json(product);
	} catch (error) {
		next(error);
	}
};
module.exports = {
	addProduct,
	updateProduct,
	getProducts,
	deleteProduct,
	getProduct,
};
