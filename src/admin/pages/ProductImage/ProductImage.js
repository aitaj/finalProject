import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductImage,fetchProductImages } from "./actions/index";
import ModalProductImage from "./ModalProductImage";
export default function Material() {
  const { productImages } = useSelector((state) => state.productImages);
  const [showModal, setShowModal] = useState(false);
  const [productImage, setProductImage] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductImages());
  }, []);
  const handleDelete = (id) => {
    dispatch(deleteProductImage(id));
  };
  const handleEdit = (size) => {
    setProductImage(size);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setProductImage({});
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
                <h3 className="productTitle my-3">Bütün şəkillər</h3>
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
                  {productImages.map((img) => {
                    return (
                      <li>
                        <div className="wrapper d-flex justify-content-between">
                          <p>{img.name}</p>
                          <img className='product-image' src={img.imagePath}/>
                          <div className="btns-wrapper">
                            <a
                              onClick={() => handleEdit(img)}
                              className="edit"
                            >
                              Yenilə
                            </a>
                            <Link
                              to={`/admin/productimages/${img.id}`}
                              className="details"
                            >
                              Detallar
                            </Link>
                            <a
                              onClick={() => {
                                handleDelete(img.id);
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
        <ModalProductImage
          closeModal={handleCloseModal}
          item={productImage}
        ></ModalProductImage>
      )}
    </>
  );
}
