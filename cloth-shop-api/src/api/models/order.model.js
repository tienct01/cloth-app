const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
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
		amount: { type: Number, required: true },
		address: { type: Object, required: true },
		status: { type: String, default: "pending" },
	},
	{
		timestamps: true,
		collection: "orders",
		versionKey: false,
	}
);

module.exports = mongoose.model("orders", OrderSchema);
