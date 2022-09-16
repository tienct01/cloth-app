const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("../src/api/middlewares/errorHandler");
const authRouter = require("./api/routes/auth.route");
const userRouter = require("./api/routes/user.route");
const productRouter = require("./api/routes/product.route");
const cartRouter = require("./api/routes/cart.route");
const orderRouter = require("./api/routes/order.route");

require("./config/mongodb");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/orders", orderRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/carts", cartRouter);

//Global error handler
// error handler
app.use(errorHandler);

module.exports = app;
