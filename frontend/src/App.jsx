/* eslint-disable react/prop-types */
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthContext } from "./hooks/useAuthContext";

const Layout = () => (
  <>
    <Navbar />
    <div className="pages">
      <Outlet />
    </div>
  </>
);

const ProtectedRoute = ({ element, user }) => {
  return user ? element : <Navigate to="/login" />;
};

const PublicRoute = ({ element, user }) => {
  return !user ? element : <Navigate to="/" />;
};

function App() {
  const { user } = useAuthContext();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <ProtectedRoute user={user} element={<Home />} />,
        },
        {
          path: "/login",
          element: <PublicRoute user={user} element={<Login />} />,
        },
        {
          path: "/signup",
          element: <PublicRoute user={user} element={<Signup />} />,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
