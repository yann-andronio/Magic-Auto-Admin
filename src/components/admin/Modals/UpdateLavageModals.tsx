// src/components/admin/Modals/UpdateLavageModals.tsx
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoMdClose } from "react-icons/io";
import { useLavage, LavageData } from "../../../context/LavageContext";

// Le schéma de validation reste le même
const schema = yup.object().shape({
  id: yup.string().required(),
  nomClient: yup.string().required("Le nom du client est requis"),
  telephone: yup
    .string()
    .required("Le numéro de téléphone est requis")
    .matches(
      /^(\+?\d{1,3}[-.\s]?)?(\d{3}[-.\s]?\d{3}[-.\s]?\d{4})$/,
      "Le format du numéro de téléphone est invalide"
    ),
  plaque: yup.string().required("La plaque d'immatriculation est requise"),
  typeVehicule: yup.string().required("Le type de véhicule est requis"),
  typeLavage: yup.string().required("Le type de lavage est requis"),
});

// Le type des données du formulaire, qui inclut l'ID
type FormData = yup.InferType<typeof schema>;

const vehicleTypes = ["Voiture", "Moto", "Vélo", "Camionnette"];
const typeDeLavage = [
  "Lavage complet",
  "Lavage intérieur & extérieur",
  "Graffitage et dégraissage moteur",
  "Nettoyage du châssis",
  "Lavage Express",
  "Lavage Premium",
];

interface UpdateLavageModalProps {
  closemodal: () => void;
  initialData: LavageData; // Le lavage à modifier
}

export default function UpdateLavageModals({
  closemodal,
  initialData,
}: UpdateLavageModalProps) {
  const { updateLavage, loading } = useLavage();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData, // Pré-remplir le formulaire avec les données initiales
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await updateLavage(data.id, data);
      reset();
      closemodal();
    } catch (err) {
      console.error("Mise à jour échouée", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm overflow-y-auto p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-[#1c273a]">
            Modifier le Lavage
          </h2>
          <button
            onClick={closemodal}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <IoMdClose size={28} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Champ nomClient */}
          <div>
            <label
              htmlFor="nomClient"
              className="block text-sm font-medium text-gray-700"
            >
              Nom du Client
            </label>
            <input
              id="nomClient"
              type="text"
              {...register("nomClient")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            />
            {errors.nomClient && (
              <p className="mt-1 text-sm text-red-600">
                {errors.nomClient.message}
              </p>
            )}
          </div>

          {/* Champ telephone */}
          <div>
            <label
              htmlFor="telephone"
              className="block text-sm font-medium text-gray-700"
            >
              Téléphone
            </label>
            <input
              id="telephone"
              type="tel"
              {...register("telephone")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            />
            {errors.telephone && (
              <p className="mt-1 text-sm text-red-600">
                {errors.telephone.message}
              </p>
            )}
          </div>

          {/* Champ plaque */}
          <div>
            <label
              htmlFor="plaque"
              className="block text-sm font-medium text-gray-700"
            >
              Plaque d'immatriculation
            </label>
            <input
              id="plaque"
              type="text"
              {...register("plaque")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            />
            {errors.plaque && (
              <p className="mt-1 text-sm text-red-600">
                {errors.plaque.message}
              </p>
            )}
          </div>

          {/* Champ typeVehicule (liste déroulante) */}
          <div>
            <label
              htmlFor="typeVehicule"
              className="block text-sm font-medium text-gray-700"
            >
              Type de Véhicule
            </label>
            <select
              id="typeVehicule"
              {...register("typeVehicule")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            >
              <option value="">Sélectionner</option>
              {vehicleTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.typeVehicule && (
              <p className="mt-1 text-sm text-red-600">
                {errors.typeVehicule.message}
              </p>
            )}
          </div>

          {/* Champ typeLavage (liste déroulante) */}
          <div>
            <label
              htmlFor="typeLavage"
              className="block text-sm font-medium text-gray-700"
            >
              Type de Lavage
            </label>
            <select
              id="typeLavage"
              {...register("typeLavage")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            >
              <option value="">Sélectionner</option>
              {typeDeLavage.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.typeLavage && (
              <p className="mt-1 text-sm text-red-600">
                {errors.typeLavage.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-200 disabled:opacity-60"
          >
            {loading ? "Mise à jour..." : "Mettre à jour le Lavage"}
          </button>
        </form>
      </div>
    </div>
  );
}
