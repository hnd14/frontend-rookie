import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { LoginPage } from "./login/LoginPage.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./store/home/Home.tsx";
import Admin from "./admin/Admin.tsx";
import CategoryPage from "./admin/category/CategoryPage.tsx";
import ProductPage from "./admin/product/ProductPage.tsx";
import NewCategoryPage from "./admin/new-category/NewCategoryPage.tsx";
import NewProductPage from "./admin/new-product/NewProductPage.tsx";
import ProductDetailsPage from "./admin/product-detail/ProductDetailsPage.tsx";
import StorePage from "./store/StorePage.tsx";
import SignUpPage from "./store/sign-up/SignupPage.tsx";
import ProductDetailsCustomerPage from "./store/product-details/ProductDetailsPage.tsx";
import ProductsListPage from "./store/products-list/ProductsListPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact Component={StorePage}>
          <Route path="/" Component={Home}></Route>
          <Route path="/login" Component={LoginPage} />
          <Route path="/signup" Component={SignUpPage} />
          <Route path="/products" Component={ProductsListPage}>
            {" "}
          </Route>
          <Route
            path="/products/:productId"
            Component={ProductDetailsCustomerPage}
          />
        </Route>

        <Route path="/admin" Component={Admin}>
          <Route index path="/admin" Component={ProductPage} />
          <Route path="/admin/categories" Component={CategoryPage} />
          <Route path="/admin/new-categories" Component={NewCategoryPage} />
          <Route
            path="/admin/products/:productId"
            Component={ProductDetailsPage}
          />
          <Route path="/admin/new-product" Component={NewProductPage} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
