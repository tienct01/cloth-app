const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema(
	{
		userId: { type: String, required: true },
		products: [
			{
				productId: { type: String },
				color: { type: String },
				size: { type: String },
				quantity: { type: Number, default: 1 },
			},
		],
	},
	{
		timestamps: true,
		collection: "carts",
		versionKey: false,
	}
);

module.exports = mongoose.model("carts", CartSchema);
