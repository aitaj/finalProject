import { Link } from "react-router-dom";
import WidgetSm from "../../components/WidgetSm/WidgetSm";
import WidgetLg from "../../components/WidgetLg/WidgetLg";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "./actions";
import API from "./api/index";
export default function Category() {

  useEffect(() => {
    const getPosts = async () => {
      const { data } = await API.get("/categories");
      console.log(data);
    };

    getPosts();
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
          <div className="category-page">
            {" "}
            <div className="product">
              <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <Link to="/newproduct">
                  <button className="productAddButton">Create</button>
                </Link>
              </div>
              <div className="productTop">
                <div className="productTopLeft">
                  {/* <Chart data={productData} dataKey="Sales" title="Sales Performance"/> */}
                </div>
                <div className="productTopRight">
                  <div className="productInfoTop">
                    <img
                      src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                      alt=""
                      className="productInfoImg"
                    />
                    <span className="productName">Apple Airpods</span>
                  </div>
                  <div className="productInfoBottom">
                    <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">123</span>
                    </div>
                    <div className="productInfoItem">
                      <span className="productInfoKey">sales:</span>
                      <span className="productInfoValue">5123</span>
                    </div>
                    <div className="productInfoItem">
                      <span className="productInfoKey">active:</span>
                      <span className="productInfoValue">yes</span>
                    </div>
                    <div className="productInfoItem">
                      <span className="productInfoKey">in stock:</span>
                      <span className="productInfoValue">no</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="productBottom">
                <form className="productForm">
                  <div className="productFormLeft">
                    <label>Product Name</label>
                    <input type="text" placeholder="Apple AirPod" />
                    <label>In Stock</label>
                    <select name="inStock" id="idStock">
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                    <label>Active</label>
                    <select name="active" id="active">
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <div className="productFormRight">
                    <div className="productUpload">
                      <img
                        src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        alt=""
                        className="productUploadImg"
                      />
                      <label for="file">{/* <Publish/> */}</label>
                      <input
                        type="file"
                        id="file"
                        style={{ display: "none" }}
                      />
                    </div>
                    <button className="productButton">Update</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
