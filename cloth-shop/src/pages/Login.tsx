import React, { CSSProperties, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getCart, login } from "../redux/callApis";
import { Announcement, NavBar } from "../components";
import { loginRejected } from "../redux/userSlice";

const Container = styled.div``;
const Wrapper = styled.div`
	width: 40%;
	margin: 50px auto;
	padding: 20px 35px;
	border: 2px solid teal;
	border-radius: 5px;
	${mobile({
		width: "auto",
		padding: "10px",
		margin: "5px",
	})};
`;
const Title = styled.h1`
	font-size: 25px;
	text-align: center;
`;
const Form = styled.form`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;
const Input = styled.input`
	min-width: 40%;
	width: 80%;
	margin: 15px 0px;
	padding: 10px;
	border: 2px solid teal;
	border-radius: 5px;
	font-family: "Roboto Slab";
	font-size: 14px;
	${mobile({
		width: "90%",
	})};
`;
const Button = styled.button`
	width: 40%;
	height: 40px;
	margin: 15px 0px;
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
const linkStyle: CSSProperties = {
	textDecoration: "none",
	display: "block",
};
const ErrorMessage = styled.div`
	text-align: start;
	font-weight: 700;
	color: red;
	padding: 0px 15px;
`;
const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [username, setUsername] = useState<string>();
	const [password, setPassword] = useState<string>();
	const { currentUser, isLoading, error } = useSelector(
		(state: RootState) => state.user
	);
	const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!username || !password) return;
		e.preventDefault();
		login(dispatch, { username: username, password: password });
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === "username") {
			setUsername(e.target.value);
		} else {
			setPassword(e.target.value);
		}
	};
	useEffect(() => {
		if (currentUser) {
			navigate("/home");
		}
	}, [currentUser]);
	return (
		<Container>
			<NavBar />
			<Announcement />
			<Wrapper>
				<Title>LOGIN</Title>
				<ErrorMessage>{error.login}</ErrorMessage>
				<Form>
					<Input
						onChange={(e) => handleChange(e)}
						placeholder="username"
						required
						name="username"
					/>
					<Input
						type={"password"}
						onChange={(e) => handleChange(e)}
						placeholder="password"
						name="password"
						required
					/>
					<Button onClick={handleLogin} disabled={isLoading}>
						LOGIN
					</Button>
				</Form>
				<Link style={linkStyle} to="/register">
					Create new account
				</Link>
			</Wrapper>
		</Container>
	);
};

export default Login;
