import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { publicRequest } from "../api/publicRequest";
import Product from "./Product";

const Container = styled.div`
	padding: 20px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;
interface ProductsProps {
	category: string | undefined;
	sort: string;
}
export interface ProductType {
	_id: string;
	title: string;
	desc: string;
	img: string;
	category: string[];
	price: number;
	instock: {
		color: string;
		size: {
			name: string;
			quantity: number;
		}[];
	}[];
}
const SORT = {
	NAMEA_Z: "namea-z",
	NAMEZ_A: "namez-a",
	PRICEASC: "priceasc",
	PRICEDESC: "pricedesc",
	DEFAULT: "default",
};
const Products = (props: ProductsProps) => {
	const { category, sort } = props;
	const [products, setProducts] = useState<ProductType[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
	useEffect(() => {
		const getProducts = async () => {
			try {
				let response;
				if (!category) {
					response = await publicRequest.get<ProductType[]>(
						"/products?new=true"
					);
				} else {
					response = await publicRequest.get<ProductType[]>(
						`/products?category=${category}`
					);
				}
				setProducts(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		getProducts();
	}, [category]);

	useEffect(() => {
		let newAr = [...products].sort((a, b) => {
			switch (sort) {
				case SORT.NAMEA_Z:
					return a.title.localeCompare(b.title);
				case SORT.NAMEZ_A:
					return b.title.localeCompare(a.title);
				case SORT.PRICEASC:
					return a.price - b.price;
				case SORT.PRICEDESC:
					return b.price - a.price;
				default:
					return 0;
			}
		});
		setFilteredProducts(newAr);
	}, [sort, category, products]);
	return (
		<Container>
			{filteredProducts.map((item) => {
				return <Product key={item._id} {...item} />;
			})}
		</Container>
	);
};

export default Products;
