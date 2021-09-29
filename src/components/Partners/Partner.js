import React, { useEffect,useState } from "react";
import OwlCarousel from "react-owl-carousel";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../../admin/pages/Company/actions";
const Partner = ({ s }) => {
  const { companies } = useSelector((state) => state.companies);
  const [categoryClicked, setCategoryClicked] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCompanies());
  }, []);
  return (
    <div className="container">
      <h3 className="text-center my-5">Partnyorlarımız</h3>
      <OwlCarousel
        className="owl-theme"
        autoplayTimeout={7000}
        items={3}
        autoplay={true}
        loop
        margin={10}
        loop={true}
        dots={true}
      >
        {companies.map((item) => {
          return (
            <a target="_self" href={item.name}>
              <img className="carousel-image ml-2 mr-2" src={item.imagePath} />
            </a>
          );
        })}
      </OwlCarousel>
    </div>
  );
};

export default Partner;
