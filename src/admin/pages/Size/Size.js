import { Link } from "react-router-dom";
import WidgetSm from "../../components/WidgetSm/WidgetSm";
import WidgetLg from "../../components/WidgetLg/WidgetLg";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSizes, deleteSize } from "./actions/index";
import ModalSize from './ModalSize'
export default function Category() {
  const { sizes } = useSelector((state) => state.sizes);
  const [showModal, setShowModal] = useState(false);
  const [sizeItem,setSizeItem]=useState({})
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSizes());
  }, []);
  const handleDelete = (id) => {
    dispatch(deleteSize(id));
  };
  const handleEditSize= (size) => {
    setShowModal(true);
    setSizeItem(size);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSizeItem({});
  };

  const handleAddUser = () => {
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
                <h1 className="productTitle">Size</h1>
                <Link>
                  <button onClick={handleAddUser} className="productAddButton">Create New</button>
                </Link>
              </div>
              <div className="sizes my-4">
                <ul>
                  <li className="">Ölçülər</li>
                  {sizes.map((size, index) => {
                    return (
                      <li>
                        <div className="wrapper d-flex justify-content-between">
                          <p>{size.name}</p>
                          <div className="btns-wrapper">
                            <a onClick={() => handleEditSize(size)} className="edit">Edit</a>
                            <a className="details">Details</a>
                            <a
                              onClick={() => {
                                handleDelete(size.id);
                              }}
                              className="delete"
                            >
                              Delete
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
   {showModal&&<ModalSize  closeModal={handleCloseModal} item={sizeItem}></ModalSize>}
    </>
  );
}
