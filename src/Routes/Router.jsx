import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import AllArticles from "../pages/AllArticles";
import ArticleDetails from "../pages/ArticleDetails";
import Subscription from "../pages/Subscription";
import MyProfile from "../pages/MyProfile";
import PremiumArticles from "../pages/PremiumArticles";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../components/Dashboard/AdminDashboard";
import NotFound from "../pages/NotFound";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateAuth from "../components/PrivateAuth";
import AddArticleForm from "../pages/AddArticle";
import MyArticles from "../pages/MyArticles";
import ManageUsers from "../components/Dashboard/ManageUsers";
import ManageArticles from "../components/Dashboard/ManageArticles";
import AddPublisher from "../components/Dashboard/AddPublisher";
import PrivateRoute from "../components/PrivateRoute";
import RoleRoute from "../components/RoleRoute";
import Unauthorized from "../pages/Unauthorized";
import UpdateProfile from "../pages/UpdateProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/all-articles", element: <AllArticles /> },
      {
        path: "/article/:id",
        element: (
          <PrivateRoute>
            <ArticleDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-article",
        element: (
          <PrivateRoute>
            <AddArticleForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/subscription",
        element: (
          <PrivateRoute>
            <Subscription />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-profile",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/premium-articles",
        element: (
          <PrivateRoute>
            <RoleRoute allowedRoles={["premium", "admin"]}>
              <PremiumArticles />
            </RoleRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-articles",
        element: (
          <PrivateRoute>
            <MyArticles />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <PrivateAuth>
            <Login />
          </PrivateAuth>
        ),
      },
      {
        path: "/register",
        element: (
          <PrivateAuth>
            <Register />
          </PrivateAuth>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <RoleRoute allowedRoles={["admin"]}>
          <AdminLayout />
        </RoleRoute>
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },

      {
        path: "/admin/dashboard",
        element: (
          <PrivateRoute>
            <RoleRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </RoleRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/manage-users",
        element: (
          <PrivateRoute>
            <RoleRoute allowedRoles={["admin"]}>
              <ManageUsers />
            </RoleRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/manage-articles",
        element: (
          <PrivateRoute>
            <RoleRoute allowedRoles={["admin"]}>
              <ManageArticles />
            </RoleRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/publisher",
        element: (
          <PrivateRoute>
            <RoleRoute allowedRoles={["admin"]}>
              <AddPublisher />
            </RoleRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "*", element: <NotFound /> },
  { path: "/unauthorized", element: <Unauthorized /> },
]);

export default router;
