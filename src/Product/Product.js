import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../admin/pages/Product/actions";
const Product = () => {
  const { products } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isClicked, setIsClicked] = useState(false);
  const [input, setInput] = useState({
    minPrice: 0,
    maxPrice: 5000,
    minPercent: 0,
    maxPercent: 99,
  });
  const [brend, setBrend] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  let currentProducts;
  const handleBrendSelect = (e) => {
    setBrend(e.target.value);
  };
  const handleOpenFilter = () => {
    setIsClicked(!isClicked);
  };
  const brends = products
    .map((p) => {
      return p.brend.name;
    })
    .filter((v, i, a) => a.indexOf(v) === i);
  const inputChange = (e, field) => {
    setInput({ ...input, [field]: parseFloat(e.target.value) });
  };
  const handleFilterForm = () => {
    currentProducts = products.filter(
      (p) => p.price > input.minPrice && p.price < input.maxPrice
    );
    currentProducts = currentProducts.filter(
      (p) => p.discount > input.minPercent && p.discount < input.maxPercent
    );
    setFilteredProducts(currentProducts);
  };

  return (
    <div id="products">
      <div className="container">
        <div className="row">
          <div className="heading">
            {/* <h5>{products[0].category}/</h5> */}
            {/* <span>{products[0].subCategory.name}</span> */}
          </div>
        </div>
        <div className="row">
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
                    <p className="text-center p-0 mt-3">
                      Endirim faizi aralığı
                    </p>
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

          <div className="col-md-9">
            <div className="row">
              {products.map((product, index) => {
                return <ProductCard key={index} product={product} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
