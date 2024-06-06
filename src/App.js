import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { LoginPage } from "./login/LoginPage.tsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./store/home/Home.tsx";
import Admin from "./admin/Admin.tsx";
import CategoryPage from "./admin/category/CategoryPage.tsx";
import NewCategoryPage from "./admin/new-category/NewCategoryPage.tsx";
import NewProductPage from "./admin/new-product/NewProductPage.tsx";
import ProductDetailsPage from "./admin/product-detail/ProductDetailsPage.tsx";
import StorePage from "./store/StorePage.tsx";
import SignUpPage from "./store/sign-up/SignupPage.tsx";
import ProductDetailsCustomerPage from "./store/product-details/ProductDetailsPage.tsx";
import ProductsListPage from "./store/products-list/ProductsListPage.tsx";
import RouteProtector from "./components/RouteProtector.tsx";
import PersistentLogin from "./components/PersistentLogin.tsx";
import ProductPageV2 from "./admin/product/ProductPageV2.tsx";
import ImageUploadPage from "./admin/image-page/ImageUploadPage.tsx";
import UsersPage from "./admin/users/UsersPage.tsx";
import NewAdminPage from "./admin/new-admin-page/NewAdminPage.tsx";
import { Suspense } from "react";
import LoadingPage from "./components/LoadingPage.tsx";
import ProfilePage from "./profile/ProfilePage.tsx";
import BasicProfile from "./profile/components/BasicProfile.tsx";
import Error404Page from "./components/Error404Page.tsx";
import SecurityPage from "./profile/components/SecurityPage.tsx";

function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <BrowserRouter>
        <Routes>
          <Route Component={PersistentLogin}>
            <Route path="/" exact Component={StorePage}>
              <Route path="/" Component={Home}></Route>
              <Route path="/login" Component={LoginPage} />
              <Route path="/signup" Component={SignUpPage} />
              <Route path="/products" Component={ProductsListPage} />
              <Route
                path="/products/:productId"
                Component={ProductDetailsCustomerPage}
              />
            </Route>
            <Route
              element={
                <RouteProtector
                  allowedRoles={["ROLE_ADMIN", "ROLE_CUSTOMER"]}
                />
              }
            >
              <Route path="/me" Component={ProfilePage}>
                <Route path="/me" Component={BasicProfile}></Route>
                <Route path="/me/security" Component={SecurityPage}></Route>
              </Route>
            </Route>
            <Route
              element={
                <RouteProtector allowedRoles={["ROLE_ADMIN"]}></RouteProtector>
              }
            >
              <Route path="/admin" Component={Admin}>
                <Route
                  index
                  path="/admin"
                  element={<Navigate to={"/admin/products"} />}
                />
                <Route index path="/admin/products" Component={ProductPageV2} />
                <Route path="/admin/categories" Component={CategoryPage} />
                <Route
                  path="/admin/new-categories"
                  Component={NewCategoryPage}
                />
                <Route
                  path="/admin/products/:productId"
                  Component={ProductDetailsPage}
                />
                <Route
                  path="/admin/products/images/:productId"
                  Component={ImageUploadPage}
                />
                <Route path="/admin/new-product" Component={NewProductPage} />
                <Route path="/admin/users" Component={UsersPage} />
                <Route path="/admin/new" Component={NewAdminPage} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
