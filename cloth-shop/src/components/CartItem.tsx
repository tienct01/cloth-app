import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

import { Clear, Remove, Add } from "@mui/icons-material/";
import { ProductType } from "./Products";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { decQuantity, deleteProduct, incQuantity } from "../redux/cartSlice";
import { NavLink } from "react-router-dom";

const CartItemContainer = styled.div`
	min-height: 160px;
	height: 160px;
	display: flex;
	border-bottom: 1px solid lightgray;
	&:last-child {
		border-bottom: none;
	}
	${mobile({
		flexWrap: "wrap",
		height: "auto",
		width: "100%",
		padding: "0px 10px",
	})}
`;
const LeftCart = styled.div`
	display: flex;
	align-items: center;
	flex: 1;
`;
const RightCart = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex: 2;
	${mobile({
		flexDirection: "column",
		padding: "5px",
		width: "100%",
	})}
`;
const MidCart = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	flex: 1.5;
`;
const ItemImageContainer = styled.div`
	height: 100%;
	${mobile({
		height: "auto",
		width: "80px",
		objectFit: "cover",
	})}
`;
const ItemImage = styled.img`
	height: 100%;
	${mobile({
		height: "auto",
		width: "100%",
	})}
`;
const ItemType = styled.div`
	font-size: 14px;
`;
const ItemName = styled.a`
	margin: 10px 0px;
	font-weight: 700;
	font-size: 16px;
	cursor: pointer;
	&:hover {
		color: blue;
	}
`;
const DeleteButton = styled.button`
	border: none;
	background-color: white;
	cursor: pointer;
	&:hover {
		color: gray;
	}
`;
const Price = styled.div`
	color: red;
	margin: 0px 10px;
	font-size: 18px;
	${mobile({
		marginBottom: "10px",
	})}
`;

const AddContainer = styled.div`
	display: flex;
`;
const AmountContainer = styled.div`
	display: flex;
	border: 2px solid lightgray;
	align-items: center;
`;
const Amount = styled.div`
	font-size: 20px;
	text-align: center;
	width: 50px;
	&:focus {
		outline: none;
	}
	${mobile({
		fontSize: "14px",
	})}
`;
const ButtonAdd = styled.button`
	font-size: 20px;
	padding: 5px;
	padding-left: 20px;
	cursor: pointer;
	background-color: white;
	border: none;
	display: flex;
	align-items: center;
	${mobile({
		fontSize: "14px",
	})}
`;
const ButtonRemove = styled.button`
	font-size: 20px;
	padding: 5px;
	padding-right: 20px;
	cursor: pointer;
	background-color: white;
	border: none;
	display: flex;
	align-items: center;
	${mobile({
		fontSize: "14px",
	})}
`;
interface CartItemProps {
	product: ProductType;
	color: String;
	size: String;
	quantity: number;
	index: number;
}
const CartItem = (props: CartItemProps) => {
	const dispatch = useDispatch();
	const handleQuantity = (action: "increase" | "decrease") => {
		if (action === "increase") {
			if (props.quantity < 99)
				dispatch(incQuantity({ productIndex: props.index }));
		} else {
			if (props.quantity > 1)
				dispatch(decQuantity({ productIndex: props.index }));
		}
	};
	const handleDelete = () => {
		dispatch(deleteProduct({ productIndex: props.index }));
	};
	return (
		<CartItemContainer>
			<LeftCart>
				<DeleteButton onClick={() => handleDelete()}>
					<Clear />
				</DeleteButton>
				<ItemImageContainer>
					<ItemImage src={props.product.img}></ItemImage>
				</ItemImageContainer>
			</LeftCart>
			<MidCart>
				<NavLink to={`/product/${props.product._id}`}>
					{props.product.title}
				</NavLink>
				<ItemType>
					{props.size} / {props.color}
				</ItemType>
			</MidCart>
			<RightCart>
				<Price>{props.product.price}</Price>
				<AddContainer>
					<AmountContainer>
						<ButtonRemove
							onClick={() => handleQuantity("decrease")}>
							<Remove />
						</ButtonRemove>
						<Amount>{props.quantity}</Amount>
						<ButtonAdd onClick={() => handleQuantity("increase")}>
							<Add />
						</ButtonAdd>
					</AmountContainer>
				</AddContainer>
			</RightCart>
		</CartItemContainer>
	);
};

export default React.memo(CartItem);
