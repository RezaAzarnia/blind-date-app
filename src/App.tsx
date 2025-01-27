import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router"
import { router } from "./routes/router.tsx"

function App() {

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>

  )
}

export default App
