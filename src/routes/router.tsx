import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import Loader from "../components/Loader";
// add the items by lazy and show loader by suspense

const Layout = lazy(() => import("../components/Layout"));

const Home = lazy(() => import("../pages/Home"));

const Error = lazy(() => import("../components/Error"));

const Login = lazy(() => import("../pages/Login"));

const HeightPicker = lazy(() => import("../pages/HeightPicker"))

const Favorites = lazy(() => import("../pages/Favorites"));

const Jobs = lazy(() => import("../pages/Jobs"))

const Pictures = lazy(() => import("../pages/Pictures"))

const ProtectRoutes = lazy(() => import("../components/ProtectRoutes"))


export const router = createBrowserRouter([
  {
    path: "",
    element: <Suspense fallback={<Loader />}>
      <Layout />
    </Suspense >,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },

      {
        path: "onBoard",
        element:
          <Login />
      },
      {
        path: "onBoard/height",
        element:
          <ProtectRoutes>
            <HeightPicker />
          </ProtectRoutes>,
        loader: async () => {
          await new Promise((resolve) => setTimeout(resolve, 2000))
        }
      },
      {
        path: "onBoard/favorites",
        element:
          <ProtectRoutes>
            <Favorites />
          </ProtectRoutes>,
        loader: async () => {
          await new Promise((resolve) => setTimeout(resolve, 2000))
        }
      },
      {
        path: "onBoard/jobs",
        element:
          <ProtectRoutes>
            <Jobs />
          </ProtectRoutes>,
        loader: async () => {
          await new Promise((resolve) => setTimeout(resolve, 2000))
        }
      },
      {
        path: "onBoard/pictures",
        element:
          <ProtectRoutes>
            <Pictures />
          </ProtectRoutes>,
        loader: async () => {
          await new Promise((resolve) => setTimeout(resolve, 2000))
        }
      }
    ],
  },
]);

