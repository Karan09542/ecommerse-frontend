import React, { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import CheckLogin from "./components/auth-model/CheckLogin.tsx";
import Navbar from "./components/header/Navbar.tsx";
import Hanger from "./components/header/nav-hanger/Hanger.tsx";
import LoginModel from "./components/auth-model/login/LoginModel.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// lazy imports
import Loading from "./components/comp_util/Loader/Loading.tsx";
const LazyVerifyEmail = React.lazy(
  () => import("./components/pages/general/VerifyEmail.tsx")
);
const LazyResetPassword = React.lazy(
  () => import("./components/pages/general/ResetPassword.tsx")
);
const LazyStarPage = React.lazy(
  () => import("./components/pages/general/StarPage.tsx")
);
const LazyCartPage = React.lazy(
  () => import("./components/pages/cart/Cart.tsx")
);
const LazyOrderHistoryPage = React.lazy(
  () => import("./components/pages/order-history/OrderHistory.tsx")
);

const LazyDashboardPage = React.lazy(
  () => import("./components/pages/dashboard/Dashboard.tsx")
);
const LazySearchPage = React.lazy(
  () => import("./components/pages/search/Search.tsx")
);
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* app-home */}
          <Route
            path="/"
            element={
              <CheckLogin>
                <Navbar />
                <Hanger />
                <App />
              </CheckLogin>
            }
          />
          {/* login */}
          <Route
            path="/account/login"
            element={
              <CheckLogin>
                <Navbar />
                <Hanger />
                <LoginModel />
              </CheckLogin>
            }
          />
          {/* verify-email */}
          <Route
            path="/verify-email"
            element={
              <Suspense fallback={<Loading />}>
                <LazyVerifyEmail />
              </Suspense>
            }
          />
          {/* reset-password */}
          <Route
            path="/reset-password"
            element={
              <Suspense fallback={<Loading />}>
                <LazyResetPassword />
              </Suspense>
            }
          />
          {/* view cart */}
          <Route
            path="/viewcart"
            element={
              <Suspense fallback={<Loading />}>
                <CheckLogin>
                  <Navbar />
                  <LazyCartPage />
                </CheckLogin>
              </Suspense>
            }
          />
          {/* order history */}
          <Route
            path="/orders"
            element={
              <CheckLogin>
                <Navbar />
                <LazyOrderHistoryPage />
              </CheckLogin>
            }
          />
          {/* dashboard */}
          <Route
            path="/seller/dashboard"
            element={
              <CheckLogin>
                <Navbar />
                <LazyDashboardPage />
              </CheckLogin>
            }
          />
          <Route
            path="/search"
            element={
              <CheckLogin>
                <Navbar />
                <Hanger isLoggedInHanger={false} />
                <LazySearchPage />
              </CheckLogin>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<Loading />}>
                <LazyStarPage />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
