import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./Product/ProductDetails";
import Signin from "./Authorization/Signin/Signin";
import Register from "./Authorization/Register/Register";
import Category from "./admin/pages/Category/Category";
import HomeAdmin from "./admin/pages/Home/HomeAdmin";
import Size from "./admin/pages/Size/Size"
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
          <Route path="/admin/sizes" component={Size}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
