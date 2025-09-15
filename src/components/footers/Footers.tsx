import React, { Fragment } from 'react';
import s from "./footers.module.css";
// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaTiktok } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { ImPhone } from 'react-icons/im';
import { BsFillChatDotsFill } from 'react-icons/bs';

export default function Footers() {
    return (
        <Fragment>
            <footer className={`${s.footer} bg-[#e0e5df] text-gray-800 text-center px-8 py-10 relative`}>
                <div className="mx-6 py-10 text-center md:text-left">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <h6 className={`${s.logo} mb-4 font-bold text-lg uppercase`}>Accès Santé</h6>
                            <p className="text-sm">
                                Facilitez votre gestion des soins grâce à notre plateforme innovante. 
                                Obtenez des conseils médicaux et des recommandations d'hôpitaux à proximité grâce à notre IA.
                            </p>
                        </div>
                        <div className='flex flex-col'>
                            <h6 className="mb-4 font-bold text-lg uppercase">Fonctionnalités</h6>
                            <p className="mb-2 text-sm"> Gestion des dossiers patients</p>
                            <p className="mb-2 text-sm"> Accès aux ordonnances</p>
                            <p className="mb-2 text-sm"> Tests de symptômes par IA</p>
                            <p className="text-sm"> Suggestions de repas sains</p>
                        </div>
                        <div className='flex flex-col'>
                            <h6 className="mb-4 font-bold text-lg uppercase">À propos</h6>  
                            <p className="mb-2 text-sm"> Engagement pour un accès équitable</p>
                            <p className="mb-2 text-sm"> Confidentialité des données</p>
                            <p className="mb-2 text-sm"> Assistance 24/7</p>
                            <p className="text-sm"> Partenariats avec les hôpitaux locaux</p>
                        </div>
                        <div>
                            <h6 className="mb-4 font-bold text-lg uppercase">Contact</h6>
                            <p className="mb-4 flex items-center justify-center md:justify-start text-sm">
                                <ImPhone className="me-3 h-5 w-5" />
                                0342290407
                            </p>
                            <p className="mb-4 flex items-center justify-center md:justify-start text-sm">
                                <HiMail className="me-3 h-5 w-5" />
                                contact@haina.com
                            </p>
                            <p className="mb-4 flex items-center justify-center md:justify-start text-sm">
                                <BsFillChatDotsFill className="me-3 h-5 w-5" />
                                Assistance Chat
                            </p>
                        </div>
                    </div>
                </div>

                {/* <div className="mt-10 border-t border-gray-400 pt-4">
                    <div className="flex justify-center space-x-4">
                        <a href="#!" className="text-gray-600 hover:text-gray-800">
                            <FaFacebookF className="h-5 w-5" />
                        </a>
                        <a href="#!" className="text-gray-600 hover:text-gray-800">
                            <FaTwitter className="h-5 w-5" />
                        </a>
                        <a href="#!" className="text-gray-600 hover:text-gray-800">
                            <FaInstagram className="h-5 w-5" />
                        </a>
                        <a href="#!" className="text-gray-600 hover:text-gray-800">
                            <FaLinkedin className="h-5 w-5" />
                        </a>
                        <a href="#!" className="text-gray-600 hover:text-gray-800">
                            <FaGithub className="h-5 w-5" />
                        </a>
                        <a href="#!" className="text-gray-600 hover:text-gray-800">
                            <FaTiktok className="h-5 w-5" />
                        </a>
                    </div>
                    <p className="mt-4 text-xs text-gray-500">© {new Date().getFullYear()} Accès Santé. Tous droits réservés.</p>
                </div> */}
            </footer>
        </Fragment>
    );
}
