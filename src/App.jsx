import React, { useEffect } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Navigate } from "react-router-dom/dist";
import SignIn from "./Components/Authentication/SignIn";
import AuthenticationLayout from "./Layouts/AuthenticationLayout";
import MainLayout from "./Layouts/MainLayout";
import Home from "./Pages/Home";
import { initializeApp } from "./Utils/axiosApi";

function App() {
  useEffect(() => {
    const initialize = async () => {
      try {
        await initializeApp();
      } catch (error) {
        console.error("Error initializing app:", error);
      }
    };

    initialize();
  }, []);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Outlet />,
      // element: <Outlet />,
      children: [
        {
          path: "",
          element: <MainLayout />,

          handle: {
            crumb: { to: "/", title: "হোম" },
          },
          children: [
            {
              path: "",
              element: <Home />,
            },
          ],
        },
        {
          path: "auth",
          element: <AuthenticationLayout />,
          children: [
            {
              path: "",
              element: <SignIn />,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
