import { Fragment, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Formreservation from '../../components/formreservation/Formreservation';
import Lottie from 'lottie-react';
import message from "../../lotties/15.json";
import { useNavigate } from 'react-router-dom';

import { motion, AnimatePresence } from 'framer-motion';



const Reservation = () => {


    const [modalIsOpen, setModalIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleModalSubmit = () => {
        setModalIsOpen(true);

        setTimeout(() => {
            setModalIsOpen(false);
        }, 2300);

        setTimeout(() => {
        navigate("/home");
        }, 2600);

    };
    return (
        <Fragment>
            <div className=" overflow-y-auto  ">

                <div className="form flex justify-center items-center h-screen">
                    <div className="w-full max-w-6xl">
                        <Formreservation handleModalSubmit={handleModalSubmit} />
                    </div>
                </div>

                <AnimatePresence>
                    {modalIsOpen && (
                        <motion.div
                            id="toast-simple"
                            className={` absolute flex items-center w-full max-w-64 p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800`}
                            role="alert"
                            initial={{ x: '100vw' }}
                            animate={{ x: '0' }}
                            exit={{ x: '100vw' }}
                            transition={{ duration: 0.6, ease: 'easeInOut' }}
                        >
                            <Lottie animationData={message} style={{ width: "20%" }} loop={false} />
                            <div className="text-[#22C55E] ps-4 text-sm font-bold"> Réservation fait avec    succès </div>
                        </motion.div>
                    )}
                </AnimatePresence>

             
            </div>
        </Fragment>
    )
}

export default Reservation;
