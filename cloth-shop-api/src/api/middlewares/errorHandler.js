const errorHandler = (err, req, res, next) => {
	if (err.name == "ValidationError") {
		return res.status(400).json({
			message: Object.values(err.errors)[0].message,
		});
	}
	console.log(err);
	res.status(500).json({
		err: err,
	});
};

module.exports = errorHandler;
