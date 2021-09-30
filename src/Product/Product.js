import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
const Product = ({ products,isFiltered }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [input, setInput] = useState({
    minPrice: 0,
    maxPrice: 5000,
    minPercent: 0,
    maxPercent: 99,
  });

  const [brend, setBrend] = useState();
  const [items, setItems] = useState(products);
  const dispatch = useDispatch();
  let currentProducts;

  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    setItems(products.slice(data.selected * 6, data.selected * 6 + 6));
  };

  return (
    <>
      <div className="row mb-4">
        {products.map((product, index) => {
          return <ProductCard key={index} product={product} />;
        })}
      </div>
      <ReactPaginate
        breakLabel={"..."}
        pageCount={10}
        marginPagesDisplayed={3}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination d-flex justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        prevClassName={"page-item"}
        previousLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      ></ReactPaginate>
    </>
  );
};

export default Product;
