import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "./actions/index";
import ModalProduct from "./ModalProduct";

const ProductCardAdmin = ({ productItem }) => {
  const [product, setProduct] = useState({});
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };
  const handleEdit = (item) => {
    setProduct(item);
    setShowModal(true);
  };

  const handleDetailed = (item) => {
    setProduct(item);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setProduct({});
  };
  return (
    <>
      {" "}
      
      <div className="row">
        <div className="col-3">
          {" "}
          <p>{productItem.name}</p>
        </div>
        <div className="col-3">
          {" "}
          <p>{productItem.brend.name}</p>
        </div>
        <div className="col-3">
          {" "}
          <p>{productItem.discount}%</p>
        </div>
        <div className="col-3">
          {" "}
          <p>{productItem.material.name}</p>
        </div>
      </div>{" "}
      <div className="wrapper d-flex justify-content-between">
        <img
          className="product-image"
          src={
            productItem.productImages.length != 0
              ? `${productItem.productImages[0].imagePath}`
              : "https://i.stack.imgur.com/y9DpT.jpg"
          }
        />
        <div className="btns-wrapper">
          <a onClick={() => handleEdit(productItem)} className="edit">
            Yenilə
          </a>
          <Link
            to={`/admin/products/${productItem.id}`}
            className="details"
            onClick={() => {
              handleDetailed(productItem);
            }}
          >
            Detallar
          </Link>
          <a
            onClick={() => {
              handleDelete(productItem.id);
            }}
            className="delete"
          >
            Sil
          </a>
        </div>
      </div>{" "}
      {showModal && (
        <ModalProduct
          closeModal={handleCloseModal}
          item={product}
        ></ModalProduct>
      )}
    </>
  );
};

export default ProductCardAdmin;
