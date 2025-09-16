//  mode: "onChange", :  valider les champs chaque fois que leur valeur change.
// toISOString():méthode JavaScript qui convertit un objet Date en une chaîne de caractères au format de date et heure 
import React, { Fragment, useState } from "react";
import { Button, Step, StepLabel, Stepper, Box } from "@mui/material";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Calendarfilter } from "../../components/calendarfilter/Calendarfilter";
import ParkingRestant from "../parkingrest/Parkingreste";

//  étapes de la réservation
const steps = [
  "Informations Personnelles & Lieu de parking",
  "Disponibilité des places",
  "Informations sur le véhicule",
  "Dates",
  "Heure & Notes",
  "Résumé de la réservation",
];

const validationSchema = Yup.object({
  name: Yup.string().required("Le nom est requis"),
  email: Yup.string().email("Email invalide").required("L'email est requis"),
  phone: Yup.string().required("Le numéro de téléphone est requis"),
  address: Yup.string().required("L'adresse est requise"),
  lieuDeParking: Yup.string().required("Le lieu de parking est requis"),
  typevehicule: Yup.string().required("Le type de véhicule est requis"),
  modelvoiture: Yup.string().required("Le modèle de voiture est requis"),
  matriculationvehicule: Yup.string().required("La plaque d'immatriculation est requise"),
  time: Yup.string().required("L'heure est requise"),
  notes: Yup.string(),
});

const Formreservation: React.FC<{ handleModalSubmit: () => void }> = ({ handleModalSubmit, }) => {
    
  const [activeStep, setActiveStep] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const { register, handleSubmit, watch, formState: { errors }} = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const watchedFields = watch();
  const selectedlieuDeParking = watchedFields.lieuDeParking; 

  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return (
          watchedFields.name &&
          watchedFields.email &&
          watchedFields.phone &&
          watchedFields.address &&
          watchedFields.lieuDeParking &&
          !errors.name &&
          !errors.email &&
          !errors.phone &&
          !errors.address &&
          !errors.lieuDeParking
        );
      case 1:
        return true;
      case 2:
        return (
          watchedFields.typevehicule &&
          watchedFields.modelvoiture &&
          watchedFields.matriculationvehicule &&
          !errors.typevehicule &&
          !errors.modelvoiture &&
          !errors.matriculationvehicule
        );
      case 3:
        return startDate && endDate;
      case 4:
        return watchedFields.time && !errors.time;
      case 5:
        return true;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (activeStep < steps.length - 1 && isStepValid()) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setActiveStep((prev) => prev - 1);

  const onSubmit = (data: any) => {
    const finalData = {
      ...data,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
    };
    handleModalSubmit();
    console.log(finalData);
  };

  const isFinalStep = activeStep === steps.length - 1;

  return (
    <Fragment>
      <div className="flex pt-10 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-[#759eee] via-[#33476c] to-[#1c273a] rounded-2xl shadow-2xl flex w-full max-w-6xl m-auto"
        >
          {/* Stepper à gauche */}
          <div className="w-1/3 p-6 bg-[#33476c]/70 backdrop-blur-md text-white">
            <h3 className="text-lg font-semibold mb-6 text-[#f8c53b]">
              Étapes de Réservation
            </h3>
            <Stepper
              activeStep={activeStep}
              orientation="vertical"
              sx={{
                "& .MuiStepLabel-label": {
                  color: "#f8c53b",
                  fontWeight: "500",
                },
                "& .MuiStepConnector-line": {
                  borderLeftWidth: "3px",
                  borderColor: "#759eee",
                },
                "& .Mui-active": {
                  "& .MuiStepLabel-label": {
                    fontWeight: "bold",
                    color: "#f8c53b",
                  },
                },
                "& .Mui-completed": {
                  "& .MuiStepLabel-label": {
                    color: "white",
                  },
                },
              }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>

          {/* Formulaire à droite */}
          
          <div className="w-2/3 p-8 bg-white overflow-hidden">
            <h3 className="text-3xl font-bold mb-6 text-[#33476c]">
              Réservation de Parking
            </h3>

            <form onSubmit={handleSubmit(onSubmit)}>
                          
              {activeStep === 0 && (
                <motion.div
                  key="step-0"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <h4 className="text-xl font-semibold text-[#759eee]">
                    {steps[activeStep]}
                  </h4>
                  <input
                    type="text"
                    placeholder="Nom complet"
                    {...register("name")}
                    className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[#759eee] outline-none transition-shadow"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                  <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[#759eee] outline-none transition-shadow"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                  <input
                    type="tel"
                    placeholder="Téléphone"
                    {...register("phone")}
                    className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[#759eee] outline-none transition-shadow"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                  <input
                    type="text"
                    placeholder="Adresse"
                    {...register("address")}
                    className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[#759eee] outline-none transition-shadow"
                  />
                  {errors.address && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.address.message}
                    </p>
                  )}
                  <select
                    {...register("lieuDeParking")}
                    className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[#759eee] outline-none transition-shadow"
                  >
                    <option value="">Choisissez un lieu de parking</option>
                    <option value="Ambohipo">Ambohipo</option>
                    <option value="Analamahitsy">Analamahitsy</option>
                    <option value="Analakely">Analakely</option>
                  </select>
                  {errors.lieuDeParking && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.lieuDeParking.message}
                    </p>
                  )}
                </motion.div>
              )}

              {activeStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <h4 className="text-xl font-semibold text-[#759eee]">
                    {steps[activeStep]}
                  </h4>
                  <ParkingRestant lieuDeParking={selectedlieuDeParking} />
                </motion.div>
              )}

              {activeStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <h4 className="text-xl font-semibold text-[#759eee]">
                    {steps[activeStep]}
                  </h4>
                  <select
                    {...register("typevehicule")}
                    className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[#759eee] outline-none transition-shadow"
                  >
                    <option value="">Choisissez le type de véhicule</option>
                    <option value="Voiture">Voiture</option>
                    <option value="Moto">Moto</option>
                    <option value="Vélo">Vélo</option>
                  </select>
                  {errors.typevehicule && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.typevehicule.message}
                    </p>
                  )}
                  <input
                    type="text"
                    placeholder="Modèle de la voiture (ex: Tesla Model 3)"
                    {...register("modelvoiture")}
                    className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[#759eee] outline-none transition-shadow"
                  />
                  {errors.modelvoiture && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.modelvoiture.message}
                    </p>
                  )}
                  <input
                    type="text"
                    placeholder="Plaque d'immatriculation"
                    {...register("matriculationvehicule")}
                    className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[#759eee] outline-none transition-shadow"
                  />
                  {errors.matriculationvehicule && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.matriculationvehicule.message}
                    </p>
                  )}
                </motion.div>
              )}

              {activeStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <h4 className="text-xl font-semibold text-[#759eee]">
                    {steps[activeStep]}
                  </h4>
                  <Calendarfilter
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                  />
                </motion.div>
              )}

              {activeStep === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <h4 className="text-xl font-semibold text-[#759eee]">
                    {steps[activeStep]}
                  </h4>
                  <input
                    type="time"
                    {...register("time")}
                    className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[#759eee] outline-none transition-shadow"
                  />
                  {errors.time && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.time.message}
                    </p>
                  )}
                  <textarea
                    {...register("notes")}
                    rows={3}
                    placeholder="Notes supplémentaires (optionnel)"
                    className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[#759eee] outline-none transition-shadow"
                  />
                </motion.div>
              )}

              {activeStep === 5 && (
                <motion.div
                  key="step-5"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <h4 className="text-xl font-semibold text-[#759eee]">
                    {steps[activeStep]}
                  </h4>
                  <Box className="bg-gray-100 p-6 rounded-xl shadow-md">
                    <div className="flex flex-wrap gap-4">
                      {/* Section Infos Personnelles & Parking */}
                      <div className="bg-white p-4 rounded-lg shadow-sm flex-1 min-w-[280px]">
                        <h5 className="font-bold text-[#33476c] mb-2">
                          Informations Personnelles
                        </h5>
                        <div className="space-y-2 text-sm">
                          <p>
                            <span className="font-semibold text-gray-700">
                              Nom :
                            </span>{" "}
                            <span className="text-gray-900">
                              {watchedFields.name}
                            </span>
                          </p>
                          <p>
                            <span className="font-semibold text-gray-700">
                              Email :
                            </span>{" "}
                            <span className="text-gray-900 break-words">
                              {watchedFields.email}
                            </span>
                          </p>
                          <p>
                            <span className="font-semibold text-gray-700">
                              Téléphone :
                            </span>{" "}
                            <span className="text-gray-900">
                              {watchedFields.phone}
                            </span>
                          </p>
                          <p>
                            <span className="font-semibold text-gray-700">
                              Adresse :
                            </span>{" "}
                            <span className="text-gray-900 break-words">
                              {watchedFields.address}
                            </span>
                          </p>
                          <p>
                            <span className="font-semibold text-gray-700">
                              Lieu de parking :
                            </span>{" "}
                            <span className="text-gray-900">
                              {watchedFields.lieuDeParking}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Section Dates & Heure */}
                      <div className="bg-white p-4 rounded-lg shadow-sm flex-1 min-w-[280px]">
                        <h5 className="font-bold text-[#33476c] mb-2">
                          Détails de la réservation
                        </h5>
                        <div className="space-y-2 text-sm">
                          <p>
                            <span className="font-semibold text-gray-700">
                              Dates :
                            </span>{" "}
                            <span className="text-gray-900">{`Du ${startDate?.toLocaleDateString()} au ${endDate?.toLocaleDateString()}`}</span>
                          </p>
                          <p>
                            <span className="font-semibold text-gray-700">
                              Heure :
                            </span>{" "}
                            <span className="text-gray-900">
                              {watchedFields.time}
                            </span>
                          </p>
                          <p>
                            <span className="font-semibold text-gray-700">
                              Véhicule :
                            </span>{" "}
                            <span className="text-gray-900">
                              {watchedFields.modelvoiture} ({watchedFields.typevehicule})
                            </span>
                          </p>
                          <p>
                            <span className="font-semibold text-gray-700">
                              Plaque :
                            </span>{" "}
                            <span className="text-gray-900">
                              {watchedFields.matriculationvehicule}
                            </span>
                          </p>
                          {watchedFields.notes && (
                            <p>
                              <span className="font-semibold text-gray-700">
                                Notes :
                              </span>{" "}
                              <span className="text-gray-900 break-words">
                                {watchedFields.notes}
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Box>
                  <p className="text-center text-sm text-gray-500 mt-4">
                    Veuillez vérifier vos informations avant de confirmer.
                  </p>
                </motion.div>
              )}

              {/* Boutons de navigation */}
              <div className="flex justify-between mt-8">
                {activeStep > 0 && (
                  <Button
                    onClick={prevStep}
                    variant="outlined"
                    sx={{ borderColor: "#759eee", color: "#33476c" }}
                  >
                    Précédent
                  </Button>
                )}
                <Button
                  onClick={isFinalStep ? handleSubmit(onSubmit) : nextStep}
                  disabled={!isStepValid()}
                  variant="contained"
                  sx={{
                    backgroundColor: "#f8c53b",
                    color: "#33476c",
                    "&:hover": { backgroundColor: "#e0ad27" },
                    marginLeft: "auto",
                  }}
                >
                  {isFinalStep ? "Confirmer la réservation" : "Suivant"}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </Fragment>
  );
};

export default Formreservation;
