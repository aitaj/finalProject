import React, { useEffect, useState } from "react";
import { useParams,useLocation } from "react-router-dom";
import API from "./api/index";
const SizeDetailed = () => {
  const [size, setSize] = useState({});
  const { id } = useParams();
  let location = useLocation();

  const useQuery = () => {
    return new URLSearchParams(location.search);
  };

  let query = useQuery();
  useEffect(() => {
    const getSize = async () => {
      const { data } = await API.get(`/sizes/${id}`);
      setSize(data);
    };
    getSize();
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
                <h1 className="productTitle">{size.name}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SizeDetailed;
