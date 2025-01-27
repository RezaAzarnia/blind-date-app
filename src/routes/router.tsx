import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
// add the items by lazy and show loader by suspense
const Layout = lazy(() => import("../components/Layout"));

const Error = lazy(() => import("../components/Error"));

const Login = lazy(() => import("../pages/Login"));

const HeightPicker = lazy(() => import("../pages/HeightPicker"))

import Loader from "../components/Loader";

export const router = createBrowserRouter([
  {
    path: "",
    element: <Suspense fallback={<Loader />}>
      <Layout />
    </Suspense >,
    errorElement: <Error />,
    children: [
      {
        path: "onBoard",
        element: <Login />
      },
      {
        path: "onBoard/height",
        element: <HeightPicker />
      },
    ],
  },
]);

