import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./stores/Store.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./stores/Store.tsx";
import App from "./App.tsx";
import HomeUser from "./pages/homesuser/HomeUser";
import Connexion from "./auth/connexion/Connexion.tsx";
import Inscription from "./auth/inscription/Inscription.tsx";
import Conseils from "./pages/conseils/Conseils";
import Reservation from "./pages/reservation/Reservation";
import Homeadmin from "./pages/Admins/homeadmin/Homeadmin.tsx";
import Dashboard from "./pages/Admins/dashboard/Dashboard.tsx";
import Home from "./pages/homes/Home.tsx";
import ParkingRealTime from "./pages/Admins/parkingrealtime/ParkingRealTime.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

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
      {
        path: "parkingRealtime",
        element: <ParkingRealTime />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
