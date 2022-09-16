import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import NavBar from "../components/NavBar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useParams } from "react-router-dom";

const Container = styled.div``;
const Title = styled.h1`
	text-align: center;
`;
const FilterContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0px 20px;
	flex-wrap: wrap;
`;
const Filter = styled.div`
	display: flex;
	${mobile({
		marginBottom: "10px",
	})}
`;
const FilterType = styled.div`
	font-size: 20px;
	font-weight: 600;
	margin-right: 10px;
	${mobile({
		fontSize: "14px",
		marginRight: "5px",
	})}
`;
const Select = styled.select`
	margin-right: 10px;
	border: 1px solid black;
	font-family: "Source Sans Pro";
	font-size: 18px;
`;
const Option = styled.option``;

const ProductList = () => {
	const { category } = useParams();
	const [sort, setSort] = useState<string>("namea-z");

	return (
		<Container>
			<NavBar />
			<Announcement />
			<Title>{category}</Title>
			<FilterContainer>
				<Filter>
					<FilterType>Sort products: </FilterType>
					<Select
						name="sort"
						value={sort}
						onChange={(e) => setSort(e.target.value)}>
						<Option value="namea-z">Name A-Z</Option>
						<Option value="namez-a">Name Z-A</Option>
						<Option value="priceasc">Price (asc)</Option>
						<Option value="pricedesc">Price (desc)</Option>
					</Select>
				</Filter>
			</FilterContainer>
			<Products category={category} sort={sort} />
			<Newsletter />
			<Footer />
		</Container>
	);
};

export default ProductList;
