import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { addProduct, editProduct } from "./actions";
import { useDispatch } from "react-redux";
const ModalProduct = ({ closeModal, item }) => {
  var date = new Date();
  date.setHours(date.getHours() + 4);
  var isodate = date.toISOString();

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    serialNumber: 0,
    locationId: 0,
    brendId: 0,
    productColorId: 0,
    sizeId: 0,
    discount: 0,
    startDiscount: null,
    endDiscount: null,
    materialId: 0,
    subcategoryId: 0,
    isFavourite: false,
    productImages: null,
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
        price: item.price,
        description: item.description,
        serialNumber: item.serialNumber,
        locationId: item.locationId,
        brendId: item.brendId,
        productColorId: item.productColorId,
        sizeId: item.sizeId,
        discount: item.discount,
        startDiscount: item.startDiscount,
        endDiscount: item.endDiscount,
        materialId: item.materialId,
        subcategoryId: item.subcategoryId,
        isFavourite: item.isFavourite,
        productImages: item.productImages,
        createdByUserId: item.createdByUserId,
        createdDate: item.createdDate,
        deletedByUserId: item.deletedByUserId,
        deletedDate: item.deletedDate,
      });
    }
  }, []);
  const convertingTarget = (target) => {
    if (typeof target == String) {
      return parseFloat(target);
    } else {
      return target;
    }
  };
  const handleChangeInp = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
    console.log(formData);
  };

  const handleAction = () => {
    closeModal();
    if (Object.keys(item).length > 0) {
      dispatch(editProduct(formData));
    } else {
      dispatch(addProduct(formData));
    }
  };
  return (
    <>
      <div>
        <Modal show={true} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {Object.keys(item).length > 0 ? "Update" : "Add"} Product
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
                type="number"
                name="name"
                className="form-control"
                placeholder="name"
                value={convertingTarget(formData.price)}
                onChange={(e) => handleChangeInp(e, "price")}
              />
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

export default ModalProduct;
