import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/Store";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend,} from "chart.js";
import { CardDashboard } from "../../../components/admin/cards/CardDashboard";
import { FaUserPlus, FaMoneyBillWave, FaPlus } from "react-icons/fa";
import { MdOutlineLocalCarWash, MdOutlineLocalParking } from "react-icons/md";
import useMultiModals from "../../../hooks/useMultiModals";
import AddLavageModals from "../../../components/admin/Modals/AddLavageModals";
import { servicePricesData } from "../../../data/servicePriceAdminData";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);


const dashboardCardsData = [
  { title: "Utilisateurs", value: "1,240", icon: FaUserPlus },
  { title: "Lavages", value: "85", icon: MdOutlineLocalCarWash },
  { title: "Réservations", value: "45",icon: MdOutlineLocalParking,},
  { title: "Revenus", value: "8,200", icon: FaMoneyBillWave },
];



const FullMonth = [ "Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
const FullParkingRevenue = [
  1200000, 1500000, 1800000, 1600000, 2000000, 2200000, 2500000, 2800000,
  3100000, 3400000, 3800000, 4200000,
];
const FulllavageRevenue = [
  500000, 650000, 700000, 750000, 800000, 850000, 900000, 950000, 1100000,
  1200000, 1350000, 1500000,
];

const optionsBar = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        font: {
          size: 14,
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#888",
        font: {},
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: "#f0f0f0",
      },
      ticks: {
        color: "#888",
        callback: function (value: any) {
          return `${value.toLocaleString("fr-MG", {
            style: "currency",
            currency: "MGA",
          })}`;
        },
      },
    },
  },
};

export default function Dashboard(): JSX.Element {
  const closeBar = useSelector((state: RootState) => state.activeLink.closeBar);
  const { modal, openModal, closModal } = useMultiModals();
  const [range, setRange] = useState<number>(6);
  const visibleLabels = FullMonth.slice(0, range);
  const visibleParkingRevenue = FullParkingRevenue.slice(0, range);
  const visibleWashRevenue = FulllavageRevenue.slice(0, range);

  const dataBar = {
    labels: visibleLabels,
    datasets: [
      {
        label: "Revenus Parking",
        data: visibleParkingRevenue,
        backgroundColor: "#759eee",
        borderRadius: 8,
      },
      {
        label: "Revenus Lavage",
        data: visibleWashRevenue,
        backgroundColor: "#fdb73d",
        borderRadius: 8,
      },
    ],
  };

  return (
    <div
      className={`Rigth bg-[#E6E6FA] w-full ${
        closeBar ? '"ml-16"' : ""
      } transition-all duration-[600ms] ease-in-out ${
        Object.values(modal).some((isOpen) => isOpen) ? "overflow-hidden" : ""
      }`}
    >
      <div className="px-20 py-8">
     
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-extrabold text-[#4c5a72]">
            Tableau de bord
          </h1>
          <button
            onClick={() => openModal("AddLavageModals")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#fdb73d] text-white font-semibold shadow-lg hover:bg-[#e0a233] transition-colors duration-200"
          >
            <FaPlus />
            Nouveau Lavage
          </button>
        </div>

      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardCardsData.map((card, index) => (
            <CardDashboard key={index} item={card} />
          ))}
        </div>

       
        <div className="grid grid-cols-1 mt-6 lg:grid-cols-3 gap-6">
        
          <div className="bg-white shadow-xl rounded-2xl p-6 lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#1c273a]">
                Revenus par service
              </h2>
              <select
                value={range}
                onChange={(e) => setRange(parseInt(e.target.value))}
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-[#759eee] focus:border-[#759eee] transition-colors duration-200"
              >
                <option value={3}>Trimestre (3 mois)</option>
                <option value={6}>Semestre (6 mois)</option>
                <option value={12}>Année (12 mois)</option>
              </select>
            </div>
            <div className="h-96">
              <Bar data={dataBar} options={optionsBar} />
            </div>
          </div>

        
          <div className="bg-white shadow-xl rounded-2xl p-6 lg:col-span-1">
            <h2 className="text-xl font-bold text-[#1c273a] mb-4">
              Tarifs de Service
            </h2>
            <div className="flex flex-col space-y-4">
              {servicePricesData.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-100"
                >
                  <div className="flex items-center gap-4">
                    {service.icon}
                    <div className="font-semibold text-gray-800">
                      {service.name}
                    </div>
                  </div>
                  <span className="font-bold text-[#1c273a]">
                    {service.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {modal.AddLavageModals && (
        <AddLavageModals closemodal={() => closModal("AddLavageModals")} />
      )}
    </div>
  );
}
