import { createBrowserRouter, redirect } from "react-router-dom";
import PageHome from "../pages/PageHome";
import PageDetail from "../pages/PageDetail";
import PageCart from "../pages/PageCart";
import PageLogin from "../pages/PageLogin"

import LoginLayout from "../layout/LoginLayout";
import ProductLayout from "../layout/ProductLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductLayout />,
    children: [
      {
        path: "/",
        element: <PageHome />,
      },
      {
        path: "detail/:id",
        element: <PageDetail />,
      },
      {
        path: "cart",
        element: <PageCart />,
        loader: () => {
          if (!localStorage.getItem("token")) {
            return redirect("/login");
          }
          return null;
        },
      },
    ],
  },
  {
    path: "/login",
    element: <LoginLayout />,

    children: [
      {
        path: "",
        element: <PageLogin />,
      },
    ],
  },
]);

export default router;
