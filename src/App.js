import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { LoginPage } from "./admin/login/LoginPage.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./store/home/Home.tsx";
import Admin from "./admin/Admin.tsx";
import CategoryPage from "./admin/category/CategoryPage.tsx";
import ProductPage from "./admin/product/ProductPage.tsx";
import NewCategoryPage from "./admin/new-category/NewCategoryPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" exact Component={Home} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/admin" Component={Admin}>
          <Route index path="/admin" Component={ProductPage} />
          <Route path="/admin/categories" Component={CategoryPage} />
          <Route path="/admin/new-categories" Component={NewCategoryPage} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
