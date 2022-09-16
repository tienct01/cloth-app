import React, { useState } from "react";
import styled from "styled-components";
import {
	FavoriteBorderOutlined,
	Search,
	ShoppingCartOutlined,
	Favorite,
} from "@mui/icons-material";

import { ProductType } from "./Products";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartSlice";
const Container = styled.div`
	flex: 1;
	margin: 10px;
	min-height: 400px;
	&:hover {
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	}
`;
const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.2);
	display: none;
`;
const Circle = styled.div`
	width: 45px;
	height: 45px;
	margin: 0px 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	background-color: #fffff9;
	cursor: pointer;
	transition: all 0.2s ease;
	&:hover {
		background-color: #bdc3c7;
		transform: scale(1.1);
	}
	z-index: 2;
`;
const ImgContainer = styled.div`
	min-width: 280px;
	position: relative;
	&:hover ${Wrapper} {
		display: flex;
	}
`;
const Image = styled.img`
	width: 100%;
	object-fit: cover;
`;
const Info = styled.div`
	padding: 10px 5px;
	text-align: center;
`;
const Name = styled.a`
	font-size: 18px;
	font-weight: bold;
	text-decoration: none;
	color: black;
	margin: 5px 0px;
	cursor: pointer;
	&:hover {
		color: gray;
	}
`;
const Price = styled.div`
	margin: 5px 0px;
`;
const Product = (item: ProductType) => {
	let fav = Boolean(localStorage.getItem(`product${item._id}`));
	const [favorite, setFavorite] = useState<boolean>(fav);

	const handleFavorite = () => {
		setFavorite((favorite) => {
			favorite
				? localStorage.removeItem(`product${item._id}`)
				: localStorage.setItem(`product${item._id}`, `true`);
			return !favorite;
		});
	};
	return (
		<Container>
			<ImgContainer>
				<Image src={item.img} />
				<Wrapper>
					<Link
						style={{
							color: "black",
						}}
						to={`/product/${item._id}`}>
						<Circle>
							<ShoppingCartOutlined
								sx={{
									margin: "5px",
									fontSize: "25px",
								}}
							/>
						</Circle>
					</Link>
					<Link
						style={{
							color: "black",
						}}
						to={`/product/${item._id}`}>
						<Circle>
							<Search
								sx={{
									margin: "5px",
									fontSize: "25px",
								}}
							/>
						</Circle>
					</Link>
					<Circle onClick={() => handleFavorite()}>
						{favorite ? (
							<Favorite
								sx={{
									margin: "5px",
									fontSize: "25px",
								}}
							/>
						) : (
							<FavoriteBorderOutlined
								sx={{
									margin: "5px",
									fontSize: "25px",
								}}
							/>
						)}
					</Circle>
				</Wrapper>
			</ImgContainer>
			<Info>
				<Name>{item.title}</Name>
				<Price>$ {item.price}</Price>
			</Info>
		</Container>
	);
};

export default Product;
