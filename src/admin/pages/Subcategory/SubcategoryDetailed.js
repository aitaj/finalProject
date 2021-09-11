import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import API from "./api/index";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import { Link } from "react-router-dom";
import { fetchCategories } from "../Category/actions/index";
import { useDispatch, useSelector } from "react-redux";
const SubcategoryDetailed = () => {
  const [subcategory, setSubcategory] = useState({});
  const { id } = useParams();
  let location = useLocation();
  const useQuery = () => {
    return new URLSearchParams(location.search);
  };
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  let query = useQuery();
  useEffect(() => {
    const getSubcategory = async () => {
      const { data } = await API.get(`/subcategories/${id}`);
      setSubcategory(data);
    };
    getSubcategory();
    
    dispatch(fetchCategories())
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
                <p className="productTitle">Ad :{subcategory.name}</p>
                <div className="btns-wrapper">
                  <Link to={`/admin/subcategories`} className="edit">
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

export default SubcategoryDetailed;