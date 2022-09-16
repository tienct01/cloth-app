import React from "react";
import { NavBar, Footer, Announcement } from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
	height: 60vh;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	background-color: #383838;
	color: white;
`;
const StatusCode = styled.h1`
	font-size: 60px;
`;
const Desc = styled.div`
	font-size: 20px;
`;

const NotFound = () => {
	return (
		<div>
			<NavBar />
			<Announcement />
			<Container>
				<StatusCode>404</StatusCode>
				<Desc>
					Page isn't available,{" "}
					<Link
						style={{ color: "red", cursor: "pointer" }}
						to="/home">
						Go back to home page
					</Link>
				</Desc>
			</Container>
			<Footer />
		</div>
	);
};

export default NotFound;
