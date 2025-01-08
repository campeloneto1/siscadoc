import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./router/router";
import { AuthProvider } from "./hooks/UseAuth";

function App() {
  const ROUTER = createBrowserRouter(routes);

  return (
    <AuthProvider>
      <RouterProvider router={ROUTER} />
    </AuthProvider>
  );
}

export default App;
