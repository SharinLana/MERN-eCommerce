import React, { BrowserRouter, Routes, Route } from "react-router-dom";
// Publicly available pages
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
// Components
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
// User components
import RoutesWithUserChatComponent from "./components/user/RoutesWithUserChatComponent";
// User pages
import UserProfilePage from "./pages/user/UserProfilePage";
import UserOrderPage from "./pages/user/UserOrderPage";
import UserOrderDetailsPage from "./pages/user/UserOrderDetailsPage";
import UserCartDetailsPage from "./pages/user/UserCartDetailsPage";
import ProtectedRoutesComponent from "./components/ProtectedRoutesComponent";
// Admin pages
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminOrderDetailsPage from "./pages/admin/AdminOrderDetailsPage";
import AdminEditUserPage from "./pages/admin/AdminEditUserPage";
import AdminEditProductPage from "./pages/admin/AdminEditProductPage";
import AdminCreateProductPage from "./pages/admin/AdminCreateProductPage";
import AdminChatsPage from "./pages/admin/AdminChatsPage";
import AdminAnalyticsPage from "./pages/admin/AdminAnalyticsPage";

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        <Route element={<RoutesWithUserChatComponent />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/product-list" element={<ProductListPage />} />
          <Route path="/product-details/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element="Page not found 404" />

          {/* User Protected Routes */}
          <Route element={<ProtectedRoutesComponent />}>
            <Route path="/user" element={<UserProfilePage />} />
            <Route path="/user/my-orders" element={<UserOrderPage />} />
            <Route
              path="/user/order-details"
              element={<UserOrderDetailsPage />}
            />
            <Route
              path="/user/cart-details"
              element={<UserCartDetailsPage />}
            />
          </Route>
        </Route>

        {/* Admin Protected Routes */}
        <Route element={<ProtectedRoutesComponent admin={true} />}>
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/edit-user" element={<AdminEditUserPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route
            path="/admin/create-new-product"
            element={<AdminCreateProductPage />}
          />
          <Route
            path="/admin/create-new-product"
            element={<AdminCreateProductPage />}
          />
          <Route
            path="/admin/edit-product"
            element={<AdminEditProductPage />}
          />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route
            path="/admin/order-details"
            element={<AdminOrderDetailsPage />}
          />
          <Route path="/admin/chats" element={<AdminChatsPage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
        </Route>
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
