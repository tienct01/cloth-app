const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
	{
		title: { type: String, required: true, unique: true },
		img: { type: String, required: true },
		categories: { type: Array },
		price: { type: Number, required: true },
		instock: [
			{
				color: { type: String, required: true },
				size: [
					{
						name: { type: String, required: true },
						quantity: { type: Number },
					},
				],
			},
		],
	},
	{
		collection: "products",
		timestamps: true,
		versionKey: false,
	}
);

module.exports = mongoose.model("products", ProductSchema);
