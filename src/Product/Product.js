import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
const Product = ({ products, isFiltered }) => {
 
  return (
    <>
      <div className="row mb-4">
        {isFiltered
          ? products.slice(0, 6).map((product, index) => {
              return <ProductCard key={index} product={product} />;
            })
          : isFiltered
          ? products.slice(0, 6).map((product, index) => {
              return <ProductCard key={index} product={product} />;
            })
          : isFiltered
          ? products.map((product, index) => {
              return <ProductCard key={index} product={product} />;
            })
          : products.slice(0, 6).map((product, index) => {
              return <ProductCard key={index} product={product} />;
            })}
      </div>

    </>
  );
};

export default Product;
