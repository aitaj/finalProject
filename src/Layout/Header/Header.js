import React, { useEffect, useState } from "react";
import { Link, Switch, Route } from "react-router-dom";
import Basket from "../../Basket/Basket";
import SignIn from "../../SignIn/SignIn";
import { MenuItems } from "./MenuItems";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
const Header = () => {
  const [clickedBar, setClickedBar] = useState(false);
  const handleBarClick = () => {
    setClickedBar(!clickedBar);
  };
  const clickedMainLink = (e) => {
    console.log(e.target.value);
  };
  return (
    <div id="header">
      <div className="desktop">
        {" "}
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <Link to="/">
                {" "}
                <div className="logo-wrapper">
                  <img src="data:image/png;base64,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" />
                </div>
              </Link>
            </div>
            <div className="col-md-5">
              <div className="w-100 d-flex align-items-center h-100">
                <form action="/catalog/" className="search-title-form w-100">
                  <div className="d-flex w-100">
                    <div className="grid-item w-100">
                      <input
                        type="text"
                        className="search-title-input w-100"
                        maxLength="50"
                        placeholder="Sayt üzrə axtarış"
                      />
                    </div>
                    <div className="grid-item-auto">
                      <button
                        type="submit"
                        className="search-title-button omid-cl-text"
                        aria-hidden="true"
                      >
                        <i className="fas fa-search"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-2">
              <div className="mt-2 connection">
                <a className="phone-wrapper mt-4 d-flex  align-items-center">
                  <i className="fas fa-phone"></i>
                  <h4>333</h4>
                </a>
                <a className="phone-wrapper d-flex align-items-center">
                  <i className="fab fa-whatsapp"></i>
                  <p>0771234567</p>
                </a>
                <p>İş vaxtı: 6:00-00:00</p>
              </div>
            </div>
            <div className="col-md-1">
              <div className="favourites d-flex justify-content-center flex-column align-items-center h-100 ">
                <Link
                  to="/"
                  className="d-flex justify-content-center  align-items-center"
                >
                  <i className="fas fa-heart"></i>
                  <p>Seçilmişlər</p>
                </Link>
              </div>
            </div>
            <div className="col-md-1">
              <div className="basket d-flex justify-content-center flex-column align-items-center h-100">
                <Link
                  to="/basket"
                  className="d-flex justify-content-center  align-items-center"
                >
                  <i className="fas fa-shopping-basket"></i>
                  <p>Səbətim</p>
                </Link>
              </div>
            </div>
            <div className="col-md-1">
              <div className="sign-in d-flex justify-content-center flex-column align-items-center h-100">
                <Link
                  to="/sign-in"
                  className="d-flex justify-content-center align-items-center "
                >
                  <i className="fas fa-sign-in-alt"></i>
                  <p> Giriş </p>
                </Link>
              </div>
            </div>
          </div>
          <Switch>
            <Route path="/basket" component={Basket} />
            <Route path="/sign-in" component={SignIn} />
          </Switch>
        </div>
        <div className="main-bant">
          <div className="container">
            {" "}
            <div className="row">
              <div className="navigation-active w-100">
                <ul className="d-flex  w-100 nav-main-ul onClick={clickedMainLink} ">
                  {MenuItems.map((item, index) => {
                    return (
                      <li className="category-main">
                        <a key={index} target="_self" href={item.url} className="main-link">
                          <span>{item.title}</span>
                        </a>
                        <ul>
                          {item.subCategories.map((category) => {
                            return (
                              <li className="subcategory-li">
                                <a className="subcategory">{category}</a>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mobile">
        <div className="navbar">
          <div className="d-flex nav-header justify-content-between w-100">
            <a onClick={handleBarClick}>
              <i className={clickedBar ? "fas fa-times" : "fas fa-bars"}></i>
            </a>
            <a>
              <i className="fas fa-search"></i>
            </a>
            <a>
              <i className="fas fa-heart"></i>
            </a>
            <Link to="/basket">
              <i className="fas  fa-shopping-basket"></i>
            </Link>
            <Link to="sign-in">
              <i className="fas fa-sign-in-alt"></i>
            </Link>
          </div>
          <div className="mobile-navbar w-100">
            <OwlCarousel
              className="owl-theme"
              autoplayTimeout={7000}
              items={3}
              autoplay={true}
              loop
              margin={10}
              loop={true}
              dots={false}
            >
              {MenuItems.map((item) => {
                return (
                  <a target="_self" href={item.url} className="main-link">
                    <span>{item.title}</span>
                  </a>
                );
              })}
            </OwlCarousel>
          </div>

          <div className={clickedBar ? "nav-wrapper active" : "nav-wrapper"}>
            <ul className="nav-main-ul">
              {MenuItems.map((item, index) => {
                return (
                  <li>
                    <a target="_self" href={item.url} className="main-link">
                      <i className={item.icon}></i>{" "}
                      <span className="ml-3">{item.title}</span>
                    </a>
                  </li>
                );
              })}
              <li className="">
                <a target="_self">
                  <i className="fas fa-sign-in-alt"></i>
                  <span className="ml-3"> Qeydiyyatdan keç</span>
                </a>
              </li>
              <li className="">
                <a target="_self">
                  <i className="fas fa-info"></i>
                  <span className="ml-3">Ətraflı Məlumat</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
