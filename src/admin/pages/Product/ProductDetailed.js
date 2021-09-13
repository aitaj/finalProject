import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import API from "./api/index";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import { Link } from "react-router-dom";
const ProductDetailed = () => {
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const { id } = useParams();
  let location = useLocation();
  const useQuery = () => {
    return new URLSearchParams(location.search);
  };

  let query = useQuery();
  useEffect(() => {
    const getProduct = async () => {
      const { data } = await API.get(`/products/${id}`);
      setProduct(data);
      setImages(data.productImages);
      console.log(data);
    };
    getProduct();
  }, []);

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
                <h3 className="productTitle my-3">Detallı məlumat</h3>
                {/* <p className="productTitle">Ad :{product.name}</p> */}
                <p className="productTitle">Ad :{product.name}</p>
                <p className="productTitle">Bütün şəkillər</p>
                {images.map((image) => {
                  return (
                    <img className="product-image" src={image.imagePath} />
                  );
                })}
                <p className="productTitle">Ad :{product.size}</p>
                <div className="btns-wrapper">
                  <Link to={`/admin/products`} className="edit">
                    Siyahıya Qayıt
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailed;
