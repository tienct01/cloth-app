import React, { createContext, useEffect } from "react";
import {
	Cart,
	Home,
	Login,
	Register,
	Product,
	ProductList,
	NotFound,
} from "./pages/index";
import {
	BrowserRouter as Router,
	Navigate,
	Route,
	Routes,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { createCart, getCart } from "./redux/callApis";
import { removeCart } from "./redux/cartSlice";
import { cartApi } from "./api/cartApi";

function App() {
	const user = useSelector((state: RootState) => state.user.currentUser);
	const productsInCart = useSelector(
		(state: RootState) => state.cart.products
	);
	const dispatch = useDispatch();
	useEffect(() => {
		const getData = async () => {
			if (user) {
				let isCartExistedRes = await cartApi.get(user.userId);
				if (isCartExistedRes.status >= 400) {
					createCart(dispatch, {
						userId: user.userId,
						products: productsInCart.map((item) => {
							return {
								productId: item.product._id,
								color: item.color,
								size: item.size,
								quantity: item.quantity,
							};
						}),
					});
				} else {
					getCart(dispatch, user.userId);
				}
			}
		};
		getData();
		return () => {
			if (user) {
				dispatch(removeCart());
			}
		};
	}, [user]);
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Home />}>
						<Route path="home" element={<Home />} />
					</Route>
					<Route path="/cart" element={<Cart />} />
					<Route path="/login" element={<Login />} />
					<Route path="/product/:productId" element={<Product />} />
					<Route path="/register" element={<Register />} />
					<Route
						path="/products/:category"
						element={<ProductList />}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
