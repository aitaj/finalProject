import React from "react";
import { Link } from "react-router-dom";
const ProductCard = ({ product }) => {
  function beforeDiscount(currentPrice, discount) {
    return (currentPrice * 100) / (100 - discount);
  }
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
              <p className="current-price"> {product.price.toFixed(2)}AZN</p>
            </div>
            <div className="discount-date">
              <span>{product.startDiscountDate}-</span>
              <span>{product.finishDiscountDate}</span>
            </div>
            <Link to={`/products/${product.name}`}>Ətraflı</Link>
          </a>
        </div>
        <div className="discount text-center">
          <p>{product.discount}%</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
