import React, { useState } from "react";
import styled from "styled-components";
import { Search, ShoppingCartOutlined, Person } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { mobile, tablet } from "../responsive";
import { css } from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/callApis";

const Container = styled.div`
	margin: 0px;
`;
const Wrapper = styled.div`
	padding: 10px 20px;
	display: flex;
	justify-content: space-between;
	text-align: start;
	position: relative;
	${mobile({
		padding: "10px",
	})}
`;
const SearchContainer = styled.div`
	border: 1px solid lightgray;
	border-radius: 5px;
	margin-left: 25px;
	padding: 5px;
	display: flex;
	align-items: center;
	${mobile({
		marginLeft: "0px",
		position: "absolute",
		top: "100%",
		left: "0px",
		padding: "0px 10px",
		width: "100%",
		borderRadius: "0px",
		backgroundColor: "white",
	})};
	@media only screen and (max-width: 425px) {
		${(props: { inputVisible: boolean }) => {
			return css`
				display: ${props.inputVisible ? "flex" : "none"};
			`;
		}};
	}
`;
const Input = styled.input`
	border: none;
	&:focus {
		outline: none;
	}
	${mobile({
		width: "100%",
		height: "30px",
	})}
`;
const Logo = styled.img.attrs({
	src: "http://theme.hstatic.net/1000285106/1000893511/14/logo.png?v=63",
})`
	width: 150px;
	${mobile({
		width: "100px",
	})}
`;
const Left = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	${mobile({
		flex: 0.5,
	})}
`;
const Right = styled.div`
	flex: 1.5;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	${mobile({
		flex: 4,
	})}
`;
const Center = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const MenuItem = styled.div`
	font-size: 18px;
	cursor: pointer;
	margin: 10px 15px;
	display: ${(props: { visible: boolean }) => {
		return props.visible ? "block" : "none";
	}};
	position: relative;
	${mobile({
		fontSize: "12px",
		margin: "5px",
	})};
	${tablet({
		fontSize: "16px",
		margin: "10px 5px",
	})};
`;
const SearchButton = styled.div`
	display: none;
	z-index: 99;
	${mobile({
		display: "flex",
		alignItems: "center",
	})};
`;
const DropDownMenu = styled.ul`
	position: absolute;
	background-color: white;
	right: 0;
	list-style-type: none;
	padding: 0;
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	display: ${(props: { visible: boolean }) => {
		return props.visible ? "block" : "none";
	}};
`;
const DropDownItem = styled.li`
	width: 100px;
	padding: 5px 10px;
	font-size: 18px;
	&:hover {
		background-color: gray;
	}
`;
const Username = styled.div`
	font-size: 16px;
	font-weight: 700;
`;
const menuItemStyle = {
	textDecoration: "none",
	color: "black",
};
const menuItemActiveStyle = {
	color: "orangered",
	textDecoration: "none",
};
const NavBar = () => {
	const user = useSelector((state: RootState) => state.user.currentUser);
	const cartQuantity = useSelector(
		(state: RootState) => state.cart.cartQuantity
	);
	const dispatch = useDispatch();
	const [inputVisible, setInputVisible] = useState<boolean>(false);
	const isLogin = Boolean(user);

	const [dropDown, setDropDown] = useState<boolean>(false);

	const handleSearchClick = () => {
		setInputVisible(!inputVisible);
	};
	const handleLogout = () => {
		logout(dispatch);
	};
	return (
		<Container>
			<Wrapper>
				<Left>
					<SearchButton onClick={() => handleSearchClick()}>
						<Search sx={{ fontSize: "22px", color: "gray" }} />
					</SearchButton>
					<SearchContainer inputVisible={inputVisible}>
						<Input />
						<Search sx={{ fontSize: "20px", color: "gray" }} />
					</SearchContainer>
				</Left>
				<Center>
					<NavLink to="/home">
						<Logo />
					</NavLink>
				</Center>
				<Right>
					<MenuItem visible={!isLogin}>
						<NavLink
							to="/login"
							style={({ isActive }) =>
								isActive ? menuItemActiveStyle : menuItemStyle
							}>
							SIGN IN
						</NavLink>
					</MenuItem>
					<MenuItem visible={!isLogin}>
						<NavLink
							to="/register"
							style={({ isActive }) =>
								isActive ? menuItemActiveStyle : menuItemStyle
							}>
							SIGN UP
						</NavLink>
					</MenuItem>
					<MenuItem visible={true}>
						<Badge badgeContent={cartQuantity} color="primary">
							<NavLink
								to="/cart"
								style={({ isActive }) =>
									isActive
										? menuItemActiveStyle
										: menuItemStyle
								}>
								<ShoppingCartOutlined></ShoppingCartOutlined>
							</NavLink>
						</Badge>
					</MenuItem>
					<Username>{user?.username}</Username>
					<MenuItem visible={isLogin}>
						<Person onClick={() => setDropDown(!dropDown)} />
						<DropDownMenu visible={dropDown}>
							<DropDownItem>Profile</DropDownItem>
							<DropDownItem onClick={handleLogout}>
								<NavLink
									style={{
										textDecoration: "none",
									}}
									to={"/home"}>
									Log Out
								</NavLink>
							</DropDownItem>
						</DropDownMenu>
					</MenuItem>
				</Right>
			</Wrapper>
		</Container>
	);
};

export default NavBar;
