// TransmetLangage.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import {  FaFlagUsa } from 'react-icons/fa'; 

const TransmetLangage: React.FC = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="flex justify-center my-5 space-x-4">
            <button 
                onClick={() => changeLanguage('fr')} 
                className="flex items-center px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition duration-300 ease-in-out"
            >
                <FaFlagUsa className="mr-2" /> {/* Drapeau français */}
                Français
            </button>
            <button 
                onClick={() => changeLanguage('en')} 
                className="flex items-center px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition duration-300 ease-in-out"
            >
                <FaFlagUsa className="mr-2" /> {/* Drapeau américain */}
                English
            </button>
        </div>
    );
};

export default TransmetLangage;
