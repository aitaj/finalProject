import React, { useEffect, useState } from "react";
import { Products } from "../Product/Products.js";
const Filter = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [input, setInput] = useState({
    minPrice: 0,
    maxPrice: 10000,
    minPercent: 0,
    maxPercent: 99,
  });
  
  let filteredProducts = Products;
  const [brend, setBrend] = useState(filteredProducts[0].brend);
  const handleBrendSelect = (e) => {
    setBrend(e.target.value);
  };
  const handleOpenFilter = () => {
    setIsClicked(!isClicked);
  };
  const brends = Products.map((p) => {
    return p.brend;
  }).filter((v, i, a) => a.indexOf(v) === i);

  const inputChange = (e, field) => {
    setInput({ ...input, [field]: parseFloat(e.target.value) });
  };
  const handleFilterForm = () => {
    filteredProducts = filteredProducts.filter(
      (p) => p.price > input.minPrice && p.price < input.maxPrice
    );
    filteredProducts = filteredProducts.filter(
      (p) => p.discount > input.minDiscount && p.discount < input.maxDiscount
    );
    filteredProducts = filteredProducts.filter((pr) => pr.brend == brend);
    console.log(filteredProducts)
  };
  return (
    <>
      <div className="col-md-3">
        <div className="filter">
          <a onClick={handleOpenFilter} className="filter-icon">
            <i class="fas fa-sort-amount-down mr-3"></i>
            <span>Filterlə</span>
          </a>
          <div className={isClicked ? "filter-body active" : "filter-body"}>
            <div className="row  mr-0">
              <div className="col-12">
                <p className="text-center p-0 mt-3">Qiymət aralığı</p>
              </div>
              <div className="col-3">
                <label for="price-filter">Min:</label>
              </div>
              <div className="col-3 p-0 ">
                <input
                  className="w-100"
                  name="price-filter"
                  type="number"
                  value={input.minPrice}
                  onChange={(e) => inputChange(e, "minPrice")}
                />
              </div>
              <div className="col-3">
                <label for="price-filter">Max:</label>
              </div>
              <div className="col-3 p-0 ">
                <input
                  className="w-100"
                  name="price-filter"
                  type="number"
                  value={input.maxPrice}
                  onChange={(e) => inputChange(e, "maxPrice")}
                />
              </div>
            </div>
            <div className="row  mr-0">
              <div className="col-12">
                <p className="text-center p-0 mt-3">Endirim faizi aralığı</p>
              </div>
              <div className="col-3">
                <label for="price-filter">Min:</label>
              </div>
              <div className="col-3 p-0 ">
                <input
                  className="w-100"
                  name="price-filter"
                  type="number"
                  value={input.minPercent}
                  onChange={(e) => inputChange(e, "minPercent")}
                />
              </div>
              <div className="col-3">
                <label for="price-filter">Max:</label>
              </div>
              <div className="col-3 p-0 ">
                <input
                  className="w-100"
                  name="price-filter"
                  type="number"
                  value={input.maxPercent}
                  onChange={(e) => inputChange(e, "maxPercent")}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="brends mt-3 ">
                  <label>Brend</label>
                  <select
                    className="brends"
                    value={brend}
                    onChange={handleBrendSelect}
                  >
                    {brends.map((brend) => {
                      return <option value={brend}>{brend}</option>;
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 mt-3">
                <a onClick={handleFilterForm} className="confirm mr-2">
                  Təsdiq et
                </a>
                <a className="reject">Ləğv et</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
