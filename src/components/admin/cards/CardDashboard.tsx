import React from "react";
import { IconType } from "react-icons";

interface CardData {
  title: string;
  value: string;
  icon: IconType;
}

interface CardDashboardProps {
  item: CardData;
}

export const CardDashboard: React.FC<CardDashboardProps> = ({ item }) => {
  const Icon = item.icon;

  const displayValue =
    item.title === "Chiffre d'affaires" ? item.value : item.value;

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 break-words">
          <p className="text-sm font-medium text-gray-700 uppercase">
            {item.title}
          </p>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {displayValue}
          </p>
        </div>
        <div className="p-3 rounded-full bg-[#759eee] text-white shadow-sm">
          <Icon className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
};
