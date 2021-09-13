import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "./actions/index";
import ModalProduct from "./ModalProduct";
export default function Product() {
  const { products } = useSelector((state) => state.products);
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    console.log(products);
  }, []);
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };
  const handleEdit = (size) => {
    setProduct(size);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setProduct({});
  };

  const handleAdd = () => {
    setShowModal(true);
  };
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <Topbar />
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          {" "}
          <div className="size-page">
            {" "}
            <div className="product">
              <div className="productTitleContainer">
                <h3 className="productTitle my-3">Bütün Məhsullar</h3>
                <Link>
                  <button onClick={handleAdd} className="productAddButton">
                    Yenisini yarat
                  </button>
                </Link>
              </div>
              <div className="sizes my-4">
                <ul>
                  <li>
                    <div className="wrapper d-flex justify-content-between header-list mb-3">
                      <h5>Ad</h5>
                    </div>
                  </li>
                  {products.map((product, index) => {
                    return (
                      <li>
                        <div className="wrapper d-flex justify-content-between">
                          <p>{product.name}</p>
                          {/* <img
                            className="product-image"
                            src={product.productimages[0].imagePath}
                          /> */}
                          <div className="btns-wrapper">
                            <a
                              onClick={() => handleEdit(product)}
                              className="edit"
                            >
                              Yenilə
                            </a>
                            <Link
                              to={`/admin/products/${product.id}`}
                              className="details"
                            >
                              Detallar
                            </Link>
                            <a
                              onClick={() => {
                                handleDelete(product.id);
                              }}
                              className="delete"
                            >
                              Sil
                            </a>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <ModalProduct
          closeModal={handleCloseModal}
          item={product}
        ></ModalProduct>
      )}
    </>
  );
}
