import React, { useEffect } from "react";
import { Products } from "./Products";
import Filter from "../Filter/Filter";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import ProductDetails from "./ProductDetails";
import { fetchProducts } from "../admin/pages/Product/actions";
const Product = () => {
  let filteredProducts = Products;
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    console.log(products);
  }, []);
  return (
    <div id="products">
      <div className="container">
        <div className="row">
          <div className="heading">
            {/* <h5>{products[0].category}/</h5> */}
            {/* <span>{products[0].subCategory.name}</span> */}
          </div>
        </div>
        <div className="row">
          <Filter filteredProducts={filteredProducts} />
          <div className="col-md-9">
            <div className="row">
              {products.map((product, index) => {
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
