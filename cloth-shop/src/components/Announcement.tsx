import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
	height: 40px;
	background-color: teal;
	color: white;
	text-align: center;
	text-transform: uppercase;
	display: flex;
	align-items: center;
	justify-content: center;
	${mobile({
		height: "30px",
		fontSize: "12px",
	})}
`;
const Announcement = () => {
	return <Container>Summertime ! - Super deal - Discount 30%</Container>;
};

export default Announcement;
