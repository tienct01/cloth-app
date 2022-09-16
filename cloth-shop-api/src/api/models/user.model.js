const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: [true, "Username is empty"],
			unique: true,
		},
		email: {
			type: String,
			required: [true, "Email is empty"],
			unique: true,
			validate: {
				validator: (val) => {
					return /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/.test(
						val
					);
				},
				message: "Email invalid",
			},
		},
		password: {
			type: String,
			required: [true, "Password must be filled"],
		},
		isadmin: {
			type: Boolean,
			default: false,
		},
	},
	{
		collection: "users",
		timestamps: true,
		versionKey: false,
	}
);

module.exports = mongoose.model("users", UserSchema);
