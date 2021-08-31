import React, { useState } from "react";
import { Products } from "../Product/Products";
const Basket = () => {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState(Products);
  const handleDecrease = (count) => {
    if (count < 1) {
      return;
    }

    setCount(count - 1);
  };
  const handleIncrease = (count) => {
    setCount(count + 1);
  };

  const handleRemoveItem = (e) => {
    setProducts(products.filter((p) => p.name != e.currentTarget.className));
  };
  return (
    <>
      <div className="container">
        <div className="row">
          {" "}
          <div className="col-12">
            <div className="basket-desktop">
              <div className="basket-header">
                <div className="row">
                  <div className="col-md-3 offset-md-1">
                    <p>Məhsullar</p>
                  </div>
                  <div className="col-md-2">
                    <p>Endirim</p>
                  </div>
                  <div className="col-md-2">
                    <p>Qiymət</p>
                  </div>
                  <div className="col-md-2">
                    <p>Miqdarı</p>
                  </div>
                </div>
              </div>
              {products.map((pr) => {
                return (
                  <div className="basket-product">
                    <div className="row">
                      <div className="col-md-1">
                        <div className="img-wrapper">
                          <img className="img-fluid" src={pr.photoUrl}></img>
                        </div>
                      </div>
                      <div className="col-md-11">
                        <div className="basket-y-center">
                          {" "}
                          <div className="row w-100">
                            {" "}
                            <div className="col-md-4 ">
                              <p>{pr.name}</p>
                            </div>
                            <div className="col-md-2 p-0">
                              <p>{pr.discount}%</p>
                            </div>
                            <div className="col-md-2 pl-0">
                              <p>{pr.price} AZN</p>
                            </div>
                            <div className="col-md-1">
                              <div className="amount d-flex w-100">
                                <a onClick={() => handleDecrease(count)}>-</a>
                                <span>{count}</span>
                                <a onClick={() => handleIncrease(count)}>+</a>
                              </div>
                            </div>
                            <div className="col-md-1">
                              {(pr.price * count).toFixed(2)}
                            </div>
                            <div className="col-md-1">
                              <a onClick={handleRemoveItem} className={pr.name}>
                                {}
                                <i className="fas fa-times"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="row">
                <div className="col-md-3 offset-md-9">
                  <div className="total mt-3">
                    <p>Total:</p>
                    <p>300AZN</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="basket-mobile">
              <div className="basket-header">s</div>
              <div className="basket-line"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Basket;
