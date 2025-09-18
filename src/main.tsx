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
import LavageVehicule from "./pages/Admins/lavagevehucule/LavageVehicule.tsx";
import ParkingReservations from "./pages/Admins/parkingReservations/ParkingReservations.tsx";
import { ReservationProvider } from "./context/ReservationContext.tsx";
import { LavageProvider } from "./context/LavageContext.tsx";

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
      {
        path: "lavagevehicule",
        element: <LavageVehicule />,
      },
      {
        path: "parkingReservations",
        element: <ParkingReservations />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <ReservationProvider>
            <LavageProvider>
              <RouterProvider router={router} />
            </LavageProvider>
          </ReservationProvider>
        </AuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
