import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoMdClose } from "react-icons/io";


const schema = yup.object().shape({
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

type FormData = yup.InferType<typeof schema>;

const vehicleTypes = ["Voiture", "Moto", "Vélo", "Camionnette"];
const typeDeLavage = [
  "Lavage complet",
  " Lavage intérieur & extérieur",
  "Graffitage et dégraissage moteur",
  "Nettoyage du châssis",
  "Lavage Express",
  "Lavage Premium",
];

type AddLavageModalProps = {
  closemodal: () => void;
};

export default function AddLavageModals({ closemodal }: AddLavageModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Données soumises :", data);
    alert("Lavage enregistré avec succès !");
    closemodal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm overflow-y-auto p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-300">
       
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-[#1c273a]">
            Enregistrer un Lavage
          </h2>
          <button
            onClick={closemodal}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <IoMdClose size={28} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Nom du client
            </label>
            <input
              {...register("nomClient")}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#759eee] focus:border-transparent shadow-sm transition-all"
              placeholder="Ex: John Doe"
            />
            {errors.nomClient && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.nomClient.message}
              </p>
            )}
          </div>

      
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Numéro de téléphone
            </label>
            <input
              {...register("telephone")}
              type="tel"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#759eee] focus:border-transparent shadow-sm transition-all"
              placeholder="+261 34 12 345 67"
            />
            {errors.telephone && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.telephone.message}
              </p>
            )}
          </div>

     
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Plaque d'immatriculation
            </label>
            <input
              {...register("plaque")}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#759eee] focus:border-transparent shadow-sm transition-all"
              placeholder="Ex: 1234 AB 56"
            />
            {errors.plaque && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.plaque.message}
              </p>
            )}
          </div>

         
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Type de véhicule
            </label>
            <select
              {...register("typeVehicule")}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#759eee] focus:border-transparent shadow-sm transition-all"
            >
              <option value="">Sélectionner un type</option>
              {vehicleTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.typeVehicule && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.typeVehicule.message}
              </p>
            )}
          </div>

       
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Type de lavage
            </label>
            <select
              {...register("typeLavage")}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#759eee] focus:border-transparent shadow-sm transition-all"
            >
              <option value="">Sélectionner un type de lavage</option>
              {typeDeLavage.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.typeLavage && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.typeLavage.message}
              </p>
            )}
          </div>

        
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#759eee] to-[#4a6cf7] text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-200 disabled:opacity-60"
          >
            {isSubmitting ? "Enregistrement..." : "Enregistrer le Lavage"}
          </button>
        </form>
      </div>
    </div>
  );
}
