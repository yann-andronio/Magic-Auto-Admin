import React, { Fragment, useState } from 'react';
import { Button, Step, StepLabel, Stepper } from '@mui/material';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import s from "./formreservation.module.css";
import Lottie from 'lottie-react';

import infoperso from "../../lotties/11.json";
import heure from "../../lotties/12.json";
import date from "../../lotties/14.json";


const steps = ['Informations Personnelles', 'Médecin et Date', 'Heure et Notes'];

const Formreservation: React.FC<{ handleModalSubmit: () => void }> = ({ handleModalSubmit }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [selectedDate, setSelectedDate] = useState(new Date());


    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            address: '',
            doctor: '',
            time: '',
            notes: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Le nom est requis'),
            email: Yup.string().email('Adresse e-mail invalide').required('L\'email est requis'),
            phone: Yup.string().required('Le numéro de téléphone est requis'),
            address: Yup.string().required('L\'adresse est requise'),
            doctor: Yup.string().required('Le médecin est requis'),
            time: Yup.string().required('L\'heure est requise'),
        }),
        onSubmit: (values) => {
            const data = { ...values, date: selectedDate.toISOString(), };
            handleModalSubmit();
            console.log(data);

        },
    });

    const isNextDisabled = () => {
        if (activeStep === 0) {
            return !formik.values.name || !formik.values.email || !formik.values.phone || !formik.values.address;
        } else if (activeStep === 1) {
            return !formik.values.doctor || !selectedDate;
        } else if (activeStep === 2) {
            return !formik.values.time;
        }
        return false;
    };

    const nextStep = () => {
        if (activeStep === steps.length - 1) {
            formik.handleSubmit();
        } else {
            setActiveStep(activeStep + 1);
        }
    };


    const prevStep = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    };

    return (
        <Fragment>
            <div className="flex  pt-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-lg shadow-lg flex w-full m-auto"
                >
                    {/* Stepper à gauche */}
                    <div className="w-1/3 p-6 border-r border-gray-300 bg-gray-50">
                        <h3 className="text-xl text-[#1976d2] font-semibold mb-4">Étapes de Réservation</h3>
                        <Stepper activeStep={activeStep} orientation="vertical"
                            sx={{
                                height: '75%',
                                '& .MuiStepLabel-root': {
                                    marginBottom: '20px',
                                },
                                '& .MuiStepConnector-line': {
                                    minHeight: '153px',
                                    borderLeftWidth: "3px",
                                    borderColor: "green",
                                },
                            }}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </div>

                    {/* Formulaire à droite */}
                    <div className="w-2/3 p-6">
                        <h3 className="text-xl font-semibold mb-4 text-[#22C55E]">Réservation de Rendez-vous</h3>
                        <form onSubmit={formik.handleSubmit}>
                            {/* Étape 1 */}
                            {activeStep === 0 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className='mb-20'
                                >
                                    <div className="flex gap-11 items-center text-center justify-between ">
                                        <h4 className="text-lg font-semibold text-[#22C55E] mb-4">Étape 1: Informations Personnelles</h4>
                                        <Lottie animationData={infoperso} style={{ width: "5%" }} loop={true} />
                                    </div>

                                    <label htmlFor="name" className="text-sm font-semibold text-gray-700 block mb-1">Nom complet:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.name}
                                        className="shadow-sm bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 mb-4"
                                    />
                                    {formik.touched.name && formik.errors.name ? <div className="text-red-600">{formik.errors.name}</div> : null}

                                    <label htmlFor="email" className="text-sm font-semibold text-gray-700 block mb-1">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                        className="shadow-sm bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 mb-4"
                                    />
                                    {formik.touched.email && formik.errors.email ? <div className="text-red-600">{formik.errors.email}</div> : null}

                                    <label htmlFor="phone" className="text-sm font-semibold text-gray-700 block mb-1">Numéro de téléphone:</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.phone}
                                        className="shadow-sm bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 mb-4"
                                    />
                                    {formik.touched.phone && formik.errors.phone ? <div className="text-red-600">{formik.errors.phone}</div> : null}

                                    {/* Champ d'adresse ajouté */}
                                    <label htmlFor="address" className="text-sm font-semibold text-gray-700 block mb-1">Adresse:</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.address}
                                        className="shadow-sm bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 mb-4"
                                    />
                                    {formik.touched.address && formik.errors.address ? <div className="text-red-600">{formik.errors.address}</div> : null}
                                </motion.div>
                            )}

                            {/* Étape 2 */}
                            {activeStep === 1 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="flex gap-11 items-center text-center justify-between ">
                                        <h4 className="text-lg font-semibold mb-4">Étape 2: Choisir un Médecin et une Date</h4>
                                        <Lottie animationData={date} style={{ width: "20%" }} loop={true} />

                                    </div>
                                    <label htmlFor="doctor" className="text-sm font-semibold text-gray-700 block mb-1">Choisissez un médecin:</label>
                                    <select
                                        id="doctor"
                                        name="doctor"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.doctor}
                                        className="shadow-sm bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 pr-9 mb-4"
                                    >
                                        <option value="">Sélectionnez un médecin</option>
                                        <option value="doctor1">Médecin 1</option>
                                        <option value="doctor2">Médecin 2</option>
                                        <option value="doctor3">Médecin 3</option>
                                    </select>
                                    {formik.touched.doctor && formik.errors.doctor ? <div className="text-red-600">{formik.errors.doctor}</div> : null}

                                    <label htmlFor="date" className="text-sm font-semibold text-gray-700 block mb-1">Date du rendez-vous:</label>
                                    <Calendar
                                        onChange={(date) => setSelectedDate(date)}
                                        value={selectedDate}
                                        className={`${s.calendrier} shadow-sm bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full mb-4`}
                                    />
                                </motion.div>
                            )}

                            {/* Étape 3 */}
                            {activeStep === 2 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="flex gap-11 items-center text-center justify-between ">
                                        <h4 className="text-lg font-semibold mb-4">Étape 3: Choisissez une Heure et Ajoutez des Notes</h4>
                                        <Lottie animationData={heure} style={{ width: "10%" }} loop={true} />

                                    </div>
                                    <label htmlFor="time" className="text-sm font-semibold text-gray-700 block mb-1">Choisissez une heure:</label>
                                    <input
                                        type="time"
                                        id="time"
                                        name="time"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.time}
                                        className="shadow-sm bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 mb-4"
                                    />
                                    {formik.touched.time && formik.errors.time ? <div className="text-red-600">{formik.errors.time}</div> : null}

                                    <label htmlFor="notes" className="text-sm font-semibold text-gray-700 block mb-1">Notes:</label>
                                    <textarea
                                        id="notes"
                                        name="notes"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.notes}
                                        rows={3}
                                        className={`${s.notes} shadow-sm bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 mb-4`}
                                    />
                                </motion.div>
                            )}

                            <div className="flex justify-between mt-6">
                                {activeStep > 0 && (
                                    <Button
                                        variant="contained"
                                        color="info"
                                        onClick={prevStep}
                                    >
                                        Précédent
                                    </Button>
                                )}
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={nextStep}
                                    disabled={isNextDisabled()}
                                >
                                    {activeStep === steps.length - 1 ? 'Envoyer' : 'Suivant'}
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
