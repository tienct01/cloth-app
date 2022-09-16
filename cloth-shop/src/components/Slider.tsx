import React from "react";
import styled from "styled-components";
import { sliderItems } from "../data";
import {
	ArrowBackIosNewRounded,
	ArrowForwardIosRounded,
} from "@mui/icons-material";
import { useState } from "react";
import { mobile } from "../responsive";
interface ArrowProps {
	direct: "left" | "right";
	onClick: (event?: React.MouseEvent<HTMLDivElement>) => void;
}
interface WrapperProps {
	index: number;
}

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	position: relative;
	margin-top: 10px;
	overflow: hidden;
	${mobile({
		display: "none",
	})}
`;

const Arrow = styled.div`
	background-color: #fff7f7;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 0;
	bottom: 0;
	left: ${(props: ArrowProps) => props.direct === "left" && "10px"};
	right: ${(props: ArrowProps) => props.direct === "right" && "10px"};
	margin: auto;
	cursor: pointer;
	opacity: 0.5;
	z-index: 9999;
	&:hover {
		opacity: 1;
		background-color: gray;
	}
`;
const Wrapper = styled.div`
	display: flex;
	transform: translateX(${(props: WrapperProps) => props.index * -100}vw);
	transition: all 1.5s ease;
`;
const Slide = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
`;
const ImgContainer = styled.div`
	flex: 1;
`;
const Image = styled.img`
	width: 100%;
	max-width: 100%;
`;
const InfoContainer = styled.div`
	flex: 1;
	text-align: center;
	padding: 0px 40px;
`;
const Title = styled.div`
	font-size: 65px;
	margin: 50px 0px;
	letter-spacing: 1px;
	font-weight: bold;
`;
const Desc = styled.div`
	font-size: 20px;
	letter-spacing: 2px;
	margin: 50px 0px;
`;
const ShopNowButton = styled.button`
	padding: 10px;
	font-size: 20px;
	background-color: transparent;
	&:hover {
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	}
	cursor: pointer;
`;
const Slider = () => {
	const [slideIndex, setSlideIndex] = useState<number>(0);
	const handleClick = (direction: "left" | "right") => {
		if (direction === "left") {
			setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
		} else {
			setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
		}
	};

	return (
		<Container>
			<Arrow direct="left" onClick={() => handleClick("left")}>
				<ArrowBackIosNewRounded />
			</Arrow>
			<Wrapper index={slideIndex}>
				{sliderItems.map((item) => (
					<Slide key={item.id}>
						<ImgContainer>
							<Image src={item.img} />
						</ImgContainer>
						<InfoContainer>
							<Title>{item.title}</Title>
							<Desc>{item.desc}</Desc>
							<ShopNowButton>SHOP NOW</ShopNowButton>
						</InfoContainer>
					</Slide>
				))}
			</Wrapper>
			<Arrow direct="right" onClick={() => handleClick("right")}>
				<ArrowForwardIosRounded />
			</Arrow>
		</Container>
	);
};

export default Slider;
