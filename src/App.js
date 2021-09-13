import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./Product/ProductDetails";
import Signin from "./Authorization/Signin/Signin";
import Register from "./Authorization/Register/Register";
import Category from "./admin/pages/Category/Category";
import HomeAdmin from "./admin/pages/Home/HomeAdmin";
import Size from "./admin/pages/Size/Size";
import Location from "./admin/pages/Location/Location";
import Brend from "./admin/pages/Brend/Brend";
import Subcategory from "./admin/pages/Subcategory/Subcategory";
import SizeDetailed from "./admin/pages/Size/SizeDetailed";
import LocationDetailed from "./admin/pages/Location/LocationDetailed";
import SubcategoryDetailed from "./admin/pages/Subcategory/SubcategoryDetailed";
import BrendDetailed from "./admin/pages/Brend/BrendDetailed";
import ColourDetailed from "./admin/pages/Colour/ColourDetailed";
import MaterialDetailed from "./admin/pages/Material/MaterialDetailed";
import CategoryDetailed from "./admin/pages/Category/CategoryDetailed";
import ProductDetailed from "./admin/pages/Product/ProductDetailed";
import ProductImageDetailed from "./admin/pages/ProductImage/ProductImageDetailed";
import Colour from "./admin/pages/Colour/Colour";
import Material from "./admin/pages/Material/Material";
import Product from "./admin/pages/Product/Product";
import ProductImage from "./admin/pages/ProductImage/ProductImage";
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/signin" component={Signin}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/product/id" component={ProductDetails}></Route>
          <Route exact path="/admin/" component={HomeAdmin}></Route>
          <Route exact path="/admin/categories" component={Category}></Route>
          <Route exact path="/admin/sizes" component={Size}></Route>
          <Route exact path="/admin/locations" component={Location}></Route>
          <Route exact path="/admin/brends" component={Brend}></Route>
          <Route exact path="/admin/colours" component={Colour}></Route>
          <Route exact path="/admin/materials" component={Material}></Route>
          <Route exact path="/admin/products" component={Product}></Route>
          <Route
            exact
            path="/admin/productimages"
            component={ProductImage}
          ></Route>
          <Route
            exact
            path="/admin/subcategories"
            component={Subcategory}
          ></Route>
          <Route path={`/admin/sizes/:id`} component={SizeDetailed} />
          <Route path={`/admin/locations/:id`} component={LocationDetailed} />
          <Route
            exact
            path="/admin/subcategories/:id"
            component={SubcategoryDetailed}
          ></Route>
          <Route
            exact
            path="/admin/brends/:id"
            component={BrendDetailed}
          ></Route>
          <Route
            exact
            path="/admin/colours/:id"
            component={ColourDetailed}
          ></Route>
          <Route
            exact
            path="/admin/materials/:id"
            component={MaterialDetailed}
          ></Route>
          <Route
            exact
            path="/admin/categories/:id"
            component={CategoryDetailed}
          ></Route>
          <Route
            exact
            path="/admin/products/:id"
            component={ProductDetailed}
          ></Route>
          <Route
            exact
            path="/admin/productimages/:id"
            component={ProductImageDetailed}
          ></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
