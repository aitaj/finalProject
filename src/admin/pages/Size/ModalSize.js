import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { addSize, editSize } from "./actions";
import { useDispatch } from "react-redux";
const ModalSize = ({ showModal, closeModal, item }) => {
  const [formData, setFormData] = useState({
    id: 134,
    name: "",
    abbrName: "",
    createdByUserId: 1,
    createdDate: new Date(new Date().toLocaleDateString()).toISOString() ,
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
        abbrName: item.abbrName,
        createdByUserId: "1",
        createdDate:new Date(new Date().toLocaleDateString()).toISOString() ,
        deletedByUserId: null,
        deletedDate: null,
        productId: null,
      });
    }
    console.log(new Date().toLocaleDateString());
  }, []);

  const handleChangeInp = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleActionSize = () => {
    closeModal();
    if (Object.keys(item).length > 0) {
      dispatch(editSize(formData));
    } else {
      dispatch(addSize(formData));
      console.log(formData);
    }
  };
  return (
    <>
      <div>
        <Modal show={true} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {Object.keys(item).length > 0 ? "Update" : "Add"} Size
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
              />
              <input
                type="text"
                name="abbrName"
                className="form-control my-3"
                placeholder="Abbretiation"
                value={formData.abbrName}
                onChange={(e) => handleChangeInp(e, "abbrName")}
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn-add"
              variant="primary"
              onClick={handleActionSize}
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

export default ModalSize;
