import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavBar from "../components/NavBar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { NavLink, useNavigate } from "react-router-dom";
import { current } from "@reduxjs/toolkit";
import { register } from "../redux/callApis";
import { loginRejected, registerRejected } from "../redux/userSlice";
const Container = styled.div``;
const Wrapper = styled.div`
	width: 60%;
	margin: 50px auto;
	padding: 20px 35px;
	border: 2px solid teal;
	border-radius: 5px;
	${mobile({
		width: "auto",
		margin: "5px",
		padding: "20px",
	})}
`;
const Title = styled.h1`
	font-size: 25px;
	text-align: center;
`;
const Form = styled.form`
	display: flex;
	flex-wrap: wrap;
`;
const Label = styled.label``;
const Input = styled.input`
	flex: 1;
	min-width: 40%;
	margin: 15px 10px 0px 10px;
	padding: 10px;
	border: 2px solid teal;
	border-radius: 5px;
	font-family: "Roboto Slab";
	font-size: 14px;
	${mobile({
		flex: "none",
		width: "90%",
		margin: "10px auto",
	})}
`;
const ButtonWrapper = styled.div`
	width: 100%;
	height: 40px;
	display: flex;
	justify-content: center;
	margin-top: 15px;
`;
const Button = styled.button`
	width: 40%;
	height: 100%;
	border: 2px solid teal;
	background-color: teal;
	color: white;
	border-radius: 5px;
	font-family: "Roboto Slab";
	font-size: 16px;
	font-weight: 700;
	cursor: pointer;
	&:hover {
		background-color: white;
		color: black;
	}
	&:disabled {
		cursor: not-allowed;
	}
`;
const Link = styled.div`
	text-align: center;
`;
const ErrorMessage = styled.div`
	text-align: start;
	font-weight: 700;
	color: red;
`;
type FormData = {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
};
const Register = () => {
	const { currentUser, isLoading, error } = useSelector(
		(state: RootState) => state.user
	);
	const { products } = useSelector((state: RootState) => state.cart);
	const dispatch = useDispatch();
	const [registerData, setRegisterData] = useState<FormData>({} as FormData);
	const navigate = useNavigate();
	const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
		const { username, email, password, confirmPassword } = registerData;
		if (!(username && email && password && confirmPassword)) return;
		e.preventDefault();
		if (registerData.password !== registerData.confirmPassword) {
			dispatch(registerRejected("Confirm password not match"));
			return;
		}
		register(dispatch, registerData);
	};
	useEffect(() => {
		if (currentUser) navigate("/home");
	}, [currentUser]);
	return (
		<Container>
			<NavBar />
			<Announcement />
			<Wrapper>
				<Title>CREATE AN ACCOUNT</Title>
				<Link>
					If you already have account, please{" "}
					<NavLink to={"/login"}>sign in</NavLink>
				</Link>
				<ErrorMessage>{error.register}</ErrorMessage>
				<Form>
					<Input
						placeholder="username"
						required
						minLength={5}
						maxLength={30}
						pattern={"[A-Za-z(0-9)+]+"}
						onChange={(e) =>
							setRegisterData({
								...registerData,
								username: e.target.value,
							})
						}
					/>
					<Input
						required
						type={"email"}
						placeholder="email"
						onChange={(e) =>
							setRegisterData({
								...registerData,
								email: e.target.value,
							})
						}
					/>
					<Input
						required
						minLength={6}
						maxLength={30}
						type={"password"}
						placeholder="password"
						onChange={(e) =>
							setRegisterData({
								...registerData,
								password: e.target.value,
							})
						}
					/>
					<Input
						required
						type={"password"}
						placeholder="confirm password"
						onChange={(e) =>
							setRegisterData({
								...registerData,
								confirmPassword: e.target.value,
							})
						}
					/>
					<ButtonWrapper>
						<Button disabled={isLoading} onClick={handleRegister}>
							CREATE
						</Button>
					</ButtonWrapper>
				</Form>
			</Wrapper>
		</Container>
	);
};

export default Register;
