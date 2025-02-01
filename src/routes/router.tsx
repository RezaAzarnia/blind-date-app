import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
// add the items by lazy and show loader by suspense
const Layout = lazy(() => import("../components/Layout"));

const Error = lazy(() => import("../components/Error"));

const Login = lazy(() => import("../pages/Login"));

const HeightPicker = lazy(() => import("../pages/HeightPicker"))

const Favorites = lazy(() => import("../pages/Favorites"));

const Jobs = lazy(() => import("../pages/Jobs"))

const Pictures = lazy(() => import("../pages/Pictures"))
import Loader from "../components/Loader";
import Home from "../pages/Home";


export const router = createBrowserRouter([
  {
    path: "",
    element: <Suspense fallback={<Loader />}>
      <Layout />
    </Suspense >,
    errorElement: <Error />,
    children: [
      {
        index : true , 
        element: <Home />
      },
    
      {
        path: "onBoard",
        element: <Login />
      },
      {
        path: "onBoard/height",
        element: <HeightPicker />
      },
      {
        path: "onBoard/favorites",
        element: <Favorites />
      },
      {
        path: "onBoard/jobs",
        element: <Jobs />
      },
      {
        path: "onBoard/pictures",
        element: <Pictures />
      }
    ],
  },
]);

