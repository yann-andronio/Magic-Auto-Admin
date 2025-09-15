import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./i18n";
import { Provider } from "react-redux";
import store from "./stores/Store.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./stores/Store.tsx";

// Pages
import App from "./App.tsx";
import HomeUser from "./pages/homesuser/HomeUser";
import Connexion from "./pages/connexion/Connexion";
import Inscription from "./pages/inscription/Inscription";
import Conseils from "./pages/conseils/Conseils";
import Testes from "./pages/testss/Testes";
import Reservation from "./pages/reservation/Reservation";
import Homeadmin from "./pages/Admins/homeadmin/Homeadmin.tsx";
import Dashboard from "./pages/Admins/dashboard/Dashboard.tsx";
import Home from "./pages/homes/Home.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Connexion />,
      },

      {
        path: "inscription",
        element: <Inscription />,
      },
    ],
  },
  {
    path: "/home",
    element: <HomeUser />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "reservation",
        element: <Reservation />,
      },
      {
        path: "conseils",
        element: <Conseils />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Homeadmin />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
