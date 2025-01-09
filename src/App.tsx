import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./router/router";
import { AuthProvider } from "./hooks/UseAuth";
import { BreadcrumbProvider } from "./hooks/UseBreadcrumb";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  const ROUTER = createBrowserRouter(routes);

  return (
    <AuthProvider>
      <BreadcrumbProvider>
        <RouterProvider router={ROUTER} />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </BreadcrumbProvider>
    </AuthProvider>
  );
}

export default App;
