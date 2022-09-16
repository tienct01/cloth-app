import { Send } from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	background-color: #e3b2c6;
	width: 100%;
	height: 50vh;
`;
const Title = styled.h2`
	font-size: 60px;
	margin: 10px 0px;
	${mobile({
		fontSize: "35px",
	})}
`;
const Desc = styled.div`
	margin: 10px 0px;
	${mobile({
		fontSize: "14px",
	})}
`;
const EmailContainer = styled.div`
	width: 40%;
	height: 40px;
	display: flex;
	justify-content: space-between;
	border: 1px solid lightgray;
	margin-top: 10px;
	${mobile({
		width: "auto",
	})}
`;
const Email = styled.input`
	flex: 8;
	padding: 0px 10px;
	border: none;
	font-size: 16px;
	font-family: "Source Sans Pro";
	outline: none;
	&:focus {
		border: 1px solid black;
	}
`;
const Button = styled.button`
	flex: 1;
	border: none;
	background-color: teal;
	color: white;
	cursor: pointer;
	&:hover {
		background-color: coral;
	}
`;
const Newsletter = () => {
	return (
		<Container>
			<Title>Newsletter</Title>
			<Desc>Get timely updates for your favorite products</Desc>
			<EmailContainer>
				<Email placeholder="Your Email"></Email>
				<Button>
					<Send />
				</Button>
			</EmailContainer>
		</Container>
	);
};

export default Newsletter;
