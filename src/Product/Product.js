import React from "react";
import { Products } from "./Products";
import Filter from "../Filter/Filter";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import ProductDetails from "./ProductDetails";
const Product = () => {
  let filteredProducts = Products;

  return (
    <div id="products">
      <div className="container">
        <div className="row">
          <div className="heading">
            {" "}
            <h5>{Products[0].category}/</h5>
            <span>{Products[0].subCategory}</span>
          </div>
        </div>
        <div className="row">
          <Filter filteredProducts={filteredProducts} />
          <div className="col-md-9">
            <div className="row">
              {filteredProducts.map((product, index) => {
                return <ProductCard key={index} product={product} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Product;
