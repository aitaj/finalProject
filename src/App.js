import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Layout/Header/Header.js";
import Footer from "./Layout/Footer/Footer.js";
import Product from "./Product/Product";
function App() {
  return (
    <>
      <Router>
        <Header></Header>
        <Product></Product>
        <Footer></Footer>
      </Router>
    </>
  );
}

export default App;
