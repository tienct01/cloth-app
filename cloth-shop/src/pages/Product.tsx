import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Newsletter from "../components/Newsletter";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import { mobile } from "../responsive";
import { ProductType } from "../components/Products";
import { Navigate, useParams } from "react-router-dom";
import { publicRequest } from "../api/publicRequest";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/cartSlice";
import { updateCart } from "../redux/callApis";
import { RootState } from "../redux/store";

interface ColorProps {
	color: string;
	selected?: boolean;
}
interface SizeProps {
	selected?: boolean;
}
const Container = styled.div``;
const Wrapper = styled.div`
	padding: 25px;
	display: flex;
	margin: auto;
	${mobile({
		flexWrap: "wrap",
		padding: "5px",
	})}
`;
const ImageContainer = styled.div`
	flex: 1;
	margin-right: 20px;
	${mobile({
		width: "100%",
		flex: "none",
	})}
`;
const Image = styled.img`
	width: 100%;
	max-width: 100%;
	height: 80vh;
	object-fit: cover;
	display: block;
	margin: auto;
	${mobile({
		objectFit: "contain",
		height: "auto",
	})}
`;
const InfoContainer = styled.div`
	flex: 1;
	${mobile({
		width: "100%",
		flex: "none",
	})}
`;
const Name = styled.h1`
	font-size: 30px;
	${mobile({
		fontSize: "20px",
	})};
`;
const ProductCode = styled.div`
	font-size: 16px;
	margin: 15px 0px;
	font-weight: 600;
	${mobile({
		fontSize: "14px",
	})};
`;
const Price = styled.div`
	font-size: 20px;
	margin: 15px 0px;
	${mobile({
		fontSize: "16px",
	})}
`;
const PriceTitle = styled.span`
	font-weight: 600;
`;
const PriceSpan = styled.span`
	font-style: italic;
`;
const FilterColorContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-wrap: wrap;
	margin-bottom: 15px;
`;
const FilterTitle = styled.div`
	margin-bottom: 15px;
	font-size: 20px;
	font-weight: 600;
	width: 100%;
	${mobile({
		fontSize: "16px",
	})}
`;
const FilterColor = styled.div`
	display: flex;
`;
const Color = styled.div`
	border: ${(props: ColorProps) => {
		if (props.selected === true) {
			return `1px solid black`;
		} else {
			return `none`;
		}
	}};
	transform: ${(props: ColorProps) => {
		if (props.selected === true) {
			return `scale(1.4)`;
		} else {
			return `none`;
		}
	}};
	border-radius: 50%;
	width: 30px;
	height: 30px;
	margin-right: 14px;
	background-color: ${(props: ColorProps) => {
		if (props.color === "white") {
			return `#F8FCFD`;
		}
		return props.color;
	}};
	cursor: pointer;
`;

const FilterSizeContainer = styled.div`
	margin-bottom: 15px;
`;
const FilterSize = styled.div`
	display: flex;
`;
const Size = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 30px;
	height: 30px;
	padding: 2px;
	margin-right: 15px;
	border-radius: 4px;
	border: ${(props: SizeProps) =>
		props.selected === true ? `1px solid black` : `none`};
	background-color: lightgray;
	font-weight: 600;
	&:hover {
		transform: scale(1.3);
	}
`;
const AddContainer = styled.div`
	display: flex;
	${mobile({
		justifyContent: "space-between",
	})}
`;
const AmountContainer = styled.div`
	display: flex;
	border: 2px solid lightgray;
	align-items: center;
	margin-right: 150px;
	${mobile({
		margin: "0",
	})}
`;
const Amount = styled.div`
	font-size: 20px;
	text-align: center;
	width: 50px;
	&:focus {
		outline: none;
	}
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
`;

const AddToCartButton = styled.button`
	border: 2px solid teal;
	background-color: white;
	letter-spacing: 0.5px;
	font-weight: 700;
	padding: 10px 15px;
	font-family: "Roboto Slab";
	cursor: pointer;
	&:hover {
		background-color: teal;
		color: white;
	}
`;
const Product = () => {
	const { productId } = useParams();
	const dispatch = useDispatch();
	const [product, setProduct] = useState<ProductType>();
	const [quantity, setQuantity] = useState<number>(1);
	const [selectedSize, setSelectedSize] = useState<string>("");
	const [selectedColor, setSelectedColor] = useState<string>("");
	const handleQuantity = (action: "increase" | "decrease") => {
		if (action === "increase") {
			if (quantity < 99) setQuantity(quantity + 1);
		} else {
			if (quantity > 1) setQuantity(quantity - 1);
		}
	};
	const handleAddToCart = () => {
		if (product) {
			dispatch(
				addProduct({
					product: product,
					productColor: selectedColor,
					productSize: selectedSize,
					productQuantity: quantity,
				})
			);
		}
	};
	useEffect(() => {
		const getProduct = async () => {
			let response = await publicRequest.get<ProductType>(
				`/products/${productId}`
			);
			setSelectedColor(response.data.instock[0].color);
			setSelectedSize(response.data.instock[0].size[0].name);
			setProduct(response.data);
		};
		getProduct();
	}, [productId]);

	return (
		<Container>
			<NavBar />
			<Announcement />
			{product ? (
				<Wrapper>
					<ImageContainer>
						<Image src={product.img} />
					</ImageContainer>
					<InfoContainer>
						<Name>{product.title}</Name>
						<Price>
							<PriceTitle>Price:</PriceTitle>{" "}
							<PriceSpan>$ {product.price}</PriceSpan>
						</Price>
						<FilterColorContainer>
							<FilterTitle>Color: </FilterTitle>
							<FilterColor>
								{product.instock.map((item, index) => {
									if (item.color === selectedColor) {
										return (
											<Color
												key={index}
												color={item.color}
												onClick={() =>
													setSelectedColor(item.color)
												}
												selected={true}
											/>
										);
									}
									return (
										<Color
											key={index}
											color={item.color}
											onClick={() =>
												setSelectedColor(item.color)
											}
										/>
									);
								})}
							</FilterColor>
						</FilterColorContainer>
						<FilterSizeContainer>
							<FilterTitle>Size: </FilterTitle>
							<FilterSize>
								{product.instock[0].size.map((value, index) => {
									if (value.name === selectedSize) {
										return (
											<Size
												key={index}
												selected={true}
												onClick={() =>
													setSelectedSize(value.name)
												}>
												{value.name}
											</Size>
										);
									}
									return (
										<Size
											key={index}
											onClick={() =>
												setSelectedSize(value.name)
											}>
											{value.name}
										</Size>
									);
								})}
							</FilterSize>
						</FilterSizeContainer>
						<AddContainer>
							<AmountContainer>
								<ButtonRemove
									onClick={() => handleQuantity("decrease")}>
									<RemoveIcon />
								</ButtonRemove>
								<Amount>{quantity}</Amount>
								<ButtonAdd
									onClick={() => handleQuantity("increase")}>
									<AddIcon />
								</ButtonAdd>
							</AmountContainer>
							<AddToCartButton onClick={handleAddToCart}>
								ADD TO CART
							</AddToCartButton>
						</AddContainer>
					</InfoContainer>
				</Wrapper>
			) : (
				<h1>Waiting</h1>
			)}
			<Newsletter />
			<Footer />
		</Container>
	);
};

export default Product;
