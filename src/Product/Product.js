import React from "react";
import { Products } from "./Products";
import Filter from "../Filter/Filter";
const Product = () => {
  function beforeDiscount(currentPrice, discount) {
    return (currentPrice * 100) / (100 - discount);
  }

  let filteredProducts = Products;

  return (
    <div className="container">
      <div className="row">
        <div className="heading">
          {" "}
          <h5>{Products[0].category}/</h5>
          <span>{Products[0].subCategory}</span>
        </div>
      </div>
      <div className="row">
        <Filter filteredProducts={filteredProducts} />
        <div className="col-md-9">
          <div className="row">
            {filteredProducts.map((product, index) => {
              return (
                <div className="col-md-4 col-6">
                  <div className="product-card mt-2">
                    <div className="custom-card-header">
                      <img className="img-fluid" src={product.photoUrl} />
                    </div>
                    <div className="custom-card-body text-center">
                      <a>
                        <h5>{product.name}</h5>
                        <p>
                          {product.brend}/{product.category}
                        </p>
                        <div className="price d-flex justify-content-around">
                          <p className="price-ex">
                            {beforeDiscount(
                              parseFloat(product.price),
                              parseFloat(product.discount)
                            ).toFixed(0)}
                            AZN
                          </p>
                          <p className="current-price">
                            {" "}
                            {product.price.toFixed(2)}AZN
                          </p>
                        </div>
                        <div className="discount-date">
                          <span>{product.startDiscountDate}-</span>
                          <span>{product.finishDiscountDate}</span>
                        </div>
                      </a>
                    </div>
                    <div className="discount text-center">
                      <p>{product.discount}%</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
