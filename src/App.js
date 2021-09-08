import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./Product/ProductDetails";
import Signin from "./Authorization/Signin/Signin";
import Register from "./Authorization/Register/Register";
import Category from "./admin/pages/Category/Category";
import HomeAdmin from "./admin/pages/Home/HomeAdmin";
import Size from "./admin/pages/Size/Size";
import Location from "./admin/pages/Location/Location";
import Subcategory from "./admin/pages/Subcategory/Subcategory";
import SizeDetailed from "./admin/pages/Size/SizeDetailed";
import LocationDetailed from "./admin/pages/Location/LocationDetailed";
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
          <Route path="/admin/categories" component={Category}></Route>
          <Route exact path="/admin/sizes" component={Size}></Route>
          <Route exact path="/admin/locations" component={Location}></Route>
          <Route
            exact
            path="/admin/subcategories"
            component={Subcategory}
          ></Route>
          <Route path={`/admin/sizes/:id`} component={SizeDetailed} />
          <Route path={`/admin/locations/:id`} component={LocationDetailed} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
