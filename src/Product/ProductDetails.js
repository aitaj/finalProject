import React, { useState, useEffect } from "react";
import { Products } from "./Products";
import Filter from "../Filter/Filter";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
const ProductDetails = () => {
  useEffect(() => {
    let thumbnails = document.getElementsByClassName("thumbnail");

    let activeImages = document.getElementsByClassName("active");

    for (var i = 0; i < thumbnails.length; i++) {
      thumbnails[i].addEventListener("click", function () {
        if (activeImages.length > 0) {
          activeImages[0].classList.remove("active");
        }

        this.classList.add("active");
        document.getElementById("featured").src = this.src;
      });
    }

    let buttonRight = document.getElementById("slideRight");
    let buttonLeft = document.getElementById("slideLeft");

    buttonLeft.addEventListener("click", function () {
      document.getElementById("slider").scrollLeft -= 180;
    });

    buttonRight.addEventListener("click", function () {
      document.getElementById("slider").scrollLeft += 180;
    });

    //zoom
    document
      .getElementById("img-container")
      .addEventListener("mouseover", function () {
        imageZoom("featured");
      });

    function imageZoom(imgID) {
      let img = document.getElementById(imgID);
      let lens = document.getElementById("lens");

      lens.style.backgroundImage = `url( ${img.src} )`;

      let ratio = 3;

      lens.style.backgroundSize =
        img.width * ratio + "px " + img.height * ratio + "px";

      img.addEventListener("mousemove", moveLens);
      lens.addEventListener("mousemove", moveLens);
      img.addEventListener("touchmove", moveLens);

      function moveLens() {
        /*
          Function sets sets position of lens over image and background image of lens
          1 - Get cursor position
          2 - Set top and left position using cursor position - lens width & height / 2
          3 - Set lens top/left positions based on cursor results
          4 - Set lens background position & invert
          5 - Set lens bounds

          */

        //1
        let pos = getCursor();

        //2
        let positionLeft = pos.x - lens.offsetWidth / 2;
        let positionTop = pos.y - lens.offsetHeight / 2;

        //5
        if (positionLeft < 0) {
          positionLeft = 0;
        }

        if (positionTop < 0) {
          positionTop = 0;
        }

        if (positionLeft > img.width - lens.offsetWidth / 3) {
          positionLeft = img.width - lens.offsetWidth / 3;
        }

        if (positionTop > img.height - lens.offsetHeight / 3) {
          positionTop = img.height - lens.offsetHeight / 3;
        }

        //3
        lens.style.left = positionLeft + "px";
        lens.style.top = positionTop + "px";

        //4
        lens.style.backgroundPosition =
          "-" + pos.x * ratio + "px -" + pos.y * ratio + "px";
      }

      function getCursor() {
        /* Function gets position of mouse in dom and bounds
           of image to know where mouse is over image when moved

          1 - set "e" to window events
          2 - Get bounds of image
          3 - set x to position of mouse on image using pageX/pageY - bounds.left/bounds.top
          4- Return x and y coordinates for mouse position on image

           */

        let e = window.event;
        let bounds = img.getBoundingClientRect();

        let x = e.pageX - bounds.left;
        let y = e.pageY - bounds.top;
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;

        return { x: x, y: y };
      }
    }

    imageZoom("featured");
  }, []);
  const [count, setCount] = useState(0);
  const handleDecrease = (count) => {
    if (count < 1) {
      return;
    }
    setCount(count - 1);
  };
  const handleIncrease = (count) => {
    setCount(count + 1);
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h3 className="text-center my-4">Product name</h3>
        </div>
        <div className="col-md-6">
          <div id="content-wrapper">
            <div className="column">
              <div id="img-container">
                <div id="lens"></div>
                <img
                  id="featured"
                  src="https://img.tozlu.com/Uploads/UrunResimleri/thumb/xp-studio-kirpik-yapistirici-d705.jpg"
                />
              </div>
              <div id="slide-wrapper">
                <img
                  id="slideLeft"
                  className="arrow"
                  src="https://img.tozlu.com/Uploads/UrunResimleri/thumb/xp-studio-kirpik-yapistirici-d705.jpg"
                />

                <div id="slider">
                  <img
                    className="thumbnail active"
                    src="https://picsum.photos/id/237/200/300"
                  />
                  <img
                    className="thumbnail"
                    src="https://picsum.photos/seed/picsum/200/300"
                  />
                  <img
                    className="thumbnail"
                    src="https://picsum.photos/seed/picsum/200/300"
                  />{" "}
                  <img
                    className="thumbnail active"
                    src="https://picsum.photos/id/237/200/300"
                  />
                  <img
                    className="thumbnail"
                    src="https://picsum.photos/seed/picsum/200/300"
                  />
                  <img
                    className="thumbnail"
                    src="https://picsum.photos/seed/picsum/200/300"
                  />{" "}
                  <img
                    className="thumbnail active"
                    src="https://picsum.photos/id/237/200/300"
                  />
                  <img
                    className="thumbnail"
                    src="https://picsum.photos/seed/picsum/200/300"
                  />
                  <img
                    className="thumbnail"
                    src="https://picsum.photos/seed/picsum/200/300"
                  />
                </div>

                <img
                  id="slideRight"
                  className="arrow"
                  src="https://picsum.photos/seed/picsum/200/300"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="product-info">
            <p className="price-info">
              Qiymət:<span className="ex-price">275AZN-</span>
              <span className="current-price">199AZN</span>
            </p>
            <p className="description">
              Ətraflı məlumat: The href attribute is required for an anchor to
              be keyboard accessible. Provide a valid, navigable address as the
              href value
            </p>
            <p className="discount-info">Endirim: 20%</p>
            <p className="size">Ölçü: M</p>
            <p>Rəng:Qara</p>
            <p>Brend:Zara</p>
            <p>Mağaza:Fəvvarələr meydanı</p>
            <p>Endirim tarixi:3 sentyabr-8 sentyabr</p>
            <div className="amount d-flex w-100 mt-2 mb-2 ">
              <a onClick={() => handleDecrease(count)}>
                <i className="fas fa-minus"></i>
              </a>
              <h5>{count}</h5>
              <a onClick={() => handleIncrease(count)}>
                <i className="fas fa-plus"></i>
              </a>
            </div>
            <p>Сəmi:300AZN</p>
            <div className="buttons-basket-back d-flex  my-4">
              <a className="add-basket mr-3">Səbətə at</a>
              <a className="go-back">Geriyə</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
