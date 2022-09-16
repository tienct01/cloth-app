import React from "react";
import NavBar from "../components/NavBar";
import Announcement from "../components/Announcement";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const Home = () => {
	return (
		<div>
			<NavBar />
			<Announcement />
			<Slider />
			<Categories />
			<Products sort="default" category="" />
			<Newsletter />
			<Footer />
		</div>
	);
};

export default Home;
