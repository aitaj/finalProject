import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Layout/Header/Header.js";
import Footer from "./Layout/Footer/Footer.js";
import Product from "./Product/Product";
import Signin from "./Authorization/Signin/Signin";
function App() {
  return (
    <>
      <Router>
        <Header></Header>
        <Product></Product>
        <Footer></Footer>
        <Switch>
        {/* <Route exact path="/" component={Home}></Route> */}
        <Route path="/signin" component={Signin}></Route>
        {/* <Route path="/register" component={Register}></Route> */}
      </Switch>
      </Router>
    
    </>
  );
}

export default App;
