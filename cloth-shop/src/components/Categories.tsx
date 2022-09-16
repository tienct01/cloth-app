import React from "react";
import styled from "styled-components";
import { categoryItem } from "../data";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
	padding: 15px;
	${mobile({
		padding: "8px",
	})}
`;
const Wrapper = styled.div`
	margin-right: -15px;
	display: flex;
	justify-content: space-evenly;
	${mobile({
		flexWrap: "wrap",
	})}
`;
const Collection = styled.h1`
	font-size: 50px;
	text-align: center;
`;
const Categories = () => {
	return (
		<Container>
			<Collection>Collection</Collection>
			<Wrapper>
				{categoryItem.map((item) => {
					return <CategoryItem key={item.id} {...item} />;
				})}
			</Wrapper>
		</Container>
	);
};

export default Categories;
