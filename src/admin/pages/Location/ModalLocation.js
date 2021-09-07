import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { addLocation, editLocation } from "./actions";
import { useDispatch } from "react-redux";
const ModalLocation = ({ readonly, closeModal, item }) => {
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    createdByUserId: 1,
    createdDate: new Date().toISOString(),
    deletedByUserId: null,
    deletedDate: null,
    productId: null,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(item).length > 0) {
      setFormData({
        id: item.id,
        name: item.name,
        createdByUserId: 1,
        createdDate: new Date(new Date().toLocaleDateString()).toISOString(),
        deletedByUserId: null,
        deletedDate: null,
        productId: null,
      });
    }
    console.log(new Date().toLocaleDateString(), item);
  }, []);

  const handleChangeInp = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleActionLocation = () => {
    closeModal();
    if (Object.keys(item).length > 0) {
      dispatch(editLocation(formData));
    } else {
      dispatch(addLocation(formData));
      console.log(formData);
    }
  };
  return (
    <>
      <div>
        <Modal show={true} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {Object.keys(item).length > 0 ? "Update" : "Add"} Location
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="name"
                value={formData.name}
                onChange={(e) => handleChangeInp(e, "name")}
                readOnly
              />
              
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn-add"
              variant="primary"
              onClick={handleActionLocation}
            >
              {Object.keys(item).length > 0 ? "Update" : "Add"}
            </Button>
            <Button
              className="btn-close"
              variant="secondary"
              onClick={closeModal}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ModalLocation;
