import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations, deleteLocation } from "./actions/index";
import ModalLocation from "./ModalLocation";
export default function Location() {
  const { locations } = useSelector((state) => state.locations);
  const [showModal, setShowModal] = useState(false);
  const [locationItem, setLocationItem] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLocations());
  }, []);
  const handleDelete = (id) => {
    dispatch(deleteLocation(id));
  };
  const handleEditSize = (size) => {
    setLocationItem(size);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setLocationItem({});
  };

  const handleAddLocation = () => {
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
                <h1 className="productTitle">Locations</h1>
                <Link>
                  <button
                    onClick={handleAddLocation}
                    className="productAddButton"
                  >
                    Create New
                  </button>
                </Link>
              </div>
              <div className="sizes my-4">
                <ul>
                  {locations.map((location, index) => {
                    return (
                      <li>
                        <div className="wrapper d-flex justify-content-between">
                          <p>{location.name}</p>
                          <div className="btns-wrapper">
                            <a
                              onClick={() => handleEditSize(location)}
                              className="edit"
                            >
                              Edit
                            </a>
                            <a className="details">Details</a>
                            <a
                              onClick={() => {
                                handleDelete(location.id);
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
      {showModal && (
        <ModalLocation
          closeModal={handleCloseModal}
          item={locationItem}
        ></ModalLocation>
      )}
    </>
  );
}
