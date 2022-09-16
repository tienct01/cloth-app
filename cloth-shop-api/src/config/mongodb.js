const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {}, (err) => {
	if (err) console.log(err);
	console.log("Database connected...");
});

module.exports = mongoose;
