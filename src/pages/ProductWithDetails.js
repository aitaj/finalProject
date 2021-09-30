import React, { useEffect } from "react";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import ProductDetails from "../Product/ProductDetails";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useLocation } from "react-router-dom";
import { fetchProducts } from "../admin/pages/Product/actions";
const ProductWithDetails = () => {
  const { id } = useParams();
  let location = useLocation();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  const useQuery = () => {
    return new URLSearchParams(location.search);
  };
  let product = products.find((p) => p.id == id);
  return (
    <>
      <ProductDetails product={product} id={id}></ProductDetails>
    </>
  );
};

export default ProductWithDetails;
