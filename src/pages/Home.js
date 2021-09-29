import React from "react";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import Product from "../Product/Product";
import Partner from "../components/Partners/Partner";
const Home = () => {
  return (
    <>
      <Header></Header>
      <Product></Product>
      <Partner></Partner>
      <Footer></Footer>
    </>
  );
};

export default Home;