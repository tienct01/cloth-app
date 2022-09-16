import React, { useEffect } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { mobile, tablet } from "../responsive";
import { RootState } from "../redux/store";
import CartItem from "../components/CartItem";
import { useSelector } from "react-redux";
import { cartApi, CartData } from "../api/cartApi";
import { updateCart } from "../redux/callApis";

const Container = styled.div``;
const CartContainer = styled.div`
	padding: 0px 50px;
	display: flex;
	flex-direction: column;
	margin-bottom: 50px;
	${mobile({
		padding: "0px",
	})}
	${tablet({
		padding: "10px",
	})}
`;
const Wrapper = styled.div`
	display: flex;
`;
const Left = styled.div`
	display: flex;
	flex: 3.5;
	margin-right: 25px;
	${mobile({
		marginRight: "0px",
	})}
`;
const Right = styled.div`
	flex: 1.5;
	${mobile({
		display: "none",
	})}
`;
const CartTitle = styled.h1`
	width: 100%;
	${mobile({
		textAlign: "center",
		margin: "15px 0px",
	})}
`;
const CartItemWrapper = styled.div`
	width: 100%;
`;
const CheckOut = styled.div`
	background: #f7f7f7;
	width: 100%;
	height: 100%;
	padding: 20px;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	align-content: flex-start;
`;
const TotalContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex: 1;
	${tablet({
		flexWrap: "wrap",
	})}
`;
const TotalTitle = styled.h3`
	font-size: 22px;
	letter-spacing: 1.5px;
	${tablet({
		margin: "10px 0px",
	})}
`;
const Total = styled.div`
	color: red;
	font-size: 22px;
	font-weight: 500;
	letter-spacing: 1.5px;
	${tablet({
		marginBottom: "15px",
	})}
`;
const CheckOutButton = styled.button`
	width: 100%;
	border-radius: 10px;
	background-color: black;
	color: white;
	height: 50px;
	font-size: 20px;
	font-weight: bold;
	font-family: "Roboto Slab";
	cursor: pointer;
	border: 3px solid black;
	&:hover {
		color: black;
		background-color: #fff;
	}
`;
const Cart = () => {
	const user = useSelector((state: RootState) => state.user.currentUser);
	const cart = useSelector((state: RootState) => state.cart);
	const { products, cartQuantity, total } = cart;
	useEffect(() => {
		if (user) updateCart(user.userId, products);
	}, [cartQuantity]);
	return (
		<Container>
			<NavBar />
			<Announcement />
			<CartContainer>
				<CartTitle>Your cart</CartTitle>
				<Wrapper>
					<Left>
						<CartItemWrapper>
							{products.map((item, id) => {
								return (
									<CartItem
										key={
											item.product._id +
											item.color +
											item.size
										}
										product={item.product}
										color={item.color}
										size={item.size}
										quantity={item.quantity}
										index={id}
									/>
								);
							})}
						</CartItemWrapper>
					</Left>
					<Right>
						<CheckOut>
							<TotalContainer>
								<TotalTitle>Total</TotalTitle>
								<Total>${total}</Total>
							</TotalContainer>
							<CheckOutButton>Checkout</CheckOutButton>
						</CheckOut>
					</Right>
				</Wrapper>
			</CartContainer>
			<Footer />
		</Container>
	);
};

export default Cart;
