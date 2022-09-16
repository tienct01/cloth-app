import React from "react";
import styled from "styled-components";
import {
	Place as PlaceIcon,
	PhoneIphone as PhoneIphoneIcon,
	Mail as MailIcon,
} from "@mui/icons-material";
import { mobile } from "../responsive";

const Container = styled.div`
	height: 50vh;
	background-color: white;
	font-size: 16px;
	display: flex;
	padding: 20px;
	flex-wrap: wrap;
`;
const LogoContainer = styled.div`
	width: 60%;
	margin: 20px 0px;
`;
const Wrapper = styled.div`
	display: flex;
	margin: 10px 0px;
`;
const Image = styled.img`
	width: 100%;
`;
const Info = styled.div`
	text-align: left;
	align-self: center;
	color: #2e2e2e;
`;
const Col1 = styled.div`
	flex: 1;
`;
const Col2 = styled.div`
	flex: 1;
	padding-left: 30px;
	${mobile({
		flex: "none",
		paddingLeft: "0px",
	})};
`;
const Col3 = styled.div`
	flex: 0.5;
	${mobile({
		flex: "none",
	})};
`;
const SocialContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	width: 100%;
	margin-bottom: 0px;
`;
const SocialLink = styled.a`
	margin: 10px;
`;
const SocialIcon = styled.img`
	width: 35px;
	height: 35px;
	cursor: pointer;
`;
const LinkContainer = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`;
const LinkItem = styled.a`
	text-decoration: none;
	font-size: 15px;
	color: black;
	cursor: pointer;
	margin: 5px 0px;
	text-align: left;
	width: 50%;
	${mobile({
		width: "100%",
	})}
`;

const Footer = () => {
	return (
		<Container>
			<Col1>
				<LogoContainer>
					<Image src="http://theme.hstatic.net/1000285106/1000893511/14/logo.png?v=63" />
				</LogoContainer>
				<Wrapper>
					<PlaceIcon sx={{ marginRight: "5px", marginTop: "5px" }} />
					<Info>
						Địa chỉ: Số 5, Đường Số 17, P.Linh Chiểu, Q.Thủ Đức,TP
						Hồ Chí Minh, VN
					</Info>
				</Wrapper>
				<Wrapper>
					<PhoneIphoneIcon
						sx={{ marginRight: "5px", marginTop: "5px" }}
					/>
					<Info>Số điện thoại: 0966.769.639</Info>
				</Wrapper>
				<Wrapper>
					<MailIcon sx={{ marginRight: "5px", marginTop: "5px" }} />
					<Info>Email: vnclo.shop@gmail.com</Info>
				</Wrapper>
			</Col1>
			<Col2>
				<h2 style={{ textAlign: "left" }}>Useful links</h2>
				<LinkContainer>
					<LinkItem>Home</LinkItem>
					<LinkItem>Man Fashion</LinkItem>
					<LinkItem>Accessories</LinkItem>
					<LinkItem>Order Tracking</LinkItem>
					<LinkItem>Wishlist</LinkItem>
					<LinkItem>Cart</LinkItem>
					<LinkItem>Woman Fashion</LinkItem>
					<LinkItem>My Account</LinkItem>
					<LinkItem>Terms</LinkItem>
				</LinkContainer>
			</Col2>
			<Col3></Col3>
			<SocialContainer>
				<SocialLink
					href="https://facebook.com"
					target="_blank"
					title="Theo doi facebook vnclo">
					<SocialIcon src="https://theme.hstatic.net/1000285106/1000893511/14/facebook.png?v=63" />
				</SocialLink>
				<SocialLink
					href="https://zalo.me"
					target="_blank"
					title="Theo doi zalo vnclo">
					<SocialIcon src="https://theme.hstatic.net/1000285106/1000893511/14/zalo.png?v=63" />
				</SocialLink>
				<SocialLink
					href="https://instagram.com"
					target="_blank"
					title="Theo doi instagram vnclo">
					<SocialIcon src="https://theme.hstatic.net/1000285106/1000893511/14/instagram.png?v=63" />
				</SocialLink>
				<SocialLink
					href="https://youtube.com"
					target="_blank"
					title="Theo doi youtube vnclo">
					<SocialIcon src="https://theme.hstatic.net/1000285106/1000893511/14/youtube.png?v=63" />
				</SocialLink>
			</SocialContainer>
		</Container>
	);
};

export default Footer;
