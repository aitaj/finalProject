import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { editProductImage, addProductImage } from "./actions";
import { useDispatch } from "react-redux";
const ModalProductImage = ({ closeModal, item }) => {
  var date = new Date();
  date.setHours(date.getHours() + 4);
  var isodate = date.toISOString();

  const [formData, setFormData] = useState({
    name: "",
    imagePath: "",
    ismain: false,
    productId: 18,
    imageFile: null,
    createdByUserId: 1,
    createdDate: isodate,
    deletedByUserId: null,
    deletedDate: null,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(item).length > 0) {
      setFormData({
        id: item.id,
        name: item.name,
        imagePath: item.imagePath,
        createdByUserId: item.createdByUserId,
        createdDate: item.createdDate,
        deletedByUserId: item.deletedByUserId,
        deletedDate: item.deletedDate,
      });
    }
  }, []);

  const handleChangeInp = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleAction = () => {
    closeModal();
    if (Object.keys(item).length > 0) {
      dispatch(editProductImage(formData));
    } else {
      dispatch(addProductImage(formData));
    }
  };
  const showprev = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setFormData({ ...formData, imageFile, imagePath: x.target.result });
      };
      reader.readAsDataURL(imageFile);
    }
    console.log(e.target.files);
  };
  const handleSubmit = () => {
    console.log("test");
  };
  return (
    <>
      <div>
        <Modal show={true} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {Object.keys(item).length > 0 ? "Update" : "Add"} Material
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="Name"
                className="form-control"
                placeholder="Nmae"
                value={formData.name}
                onChange={(e) => handleChangeInp(e, "name")}
              />
              <input
                type="text"
                name="ImagePath"
                className="form-control"
                placeholder="imagePath"
                value={formData.imagePath}
                onChange={(e) => handleChangeInp(e, "imagePath")}
              />
              <input
                type="file"
                accept="image/*"
                name="imagePath"
                className="form-control-file"
                placeholder="imagePath"
                onChange={showprev}
              />
              <img className="product-image" src={formData.imagePath} />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn-add"
              variant="primary"
              onClick={handleAction}
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

export default ModalProductImage;
