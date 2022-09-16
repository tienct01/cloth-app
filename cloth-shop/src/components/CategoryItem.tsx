import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

interface CategoryItemProps {
	id: number;
	title: string;
	img: string;
	categoryName: string;
}
const Container = styled.div`
	margin-right: 15px;
	height: 70vh;
	position: relative;
	overflow-y: hidden;
	&:hover {
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	}
	${mobile({
		marginBottom: "15px",
		height: "45vh",
		display: "flex",
		alignItems: "center",
	})}
`;
const Image = styled.img`
	width: 100%;
	object-fit: cover;
	${mobile({})}
`;
const Info = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0px;
	bottom: 0px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
const Title = styled.div`
	font-size: 35px;
	color: white;
	font-weight: bold;
	letter-spacing: 2px;
	margin: 20px 0px;
`;
const ShopBtn = styled.button`
	border: 1px solid gray;
	font-size: 16px;
	color: gray;
	padding: 10px;
	cursor: pointer;
`;
const CategoryItem = (item: CategoryItemProps) => {
	return (
		<Link to={`products/${item.categoryName}`}>
			<Container>
				<Image src={item.img} />
				<Info>
					<Title>{item.title}</Title>
					<ShopBtn>Shop now</ShopBtn>
				</Info>
			</Container>
		</Link>
	);
};

export default CategoryItem;
