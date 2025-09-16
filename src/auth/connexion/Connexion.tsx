import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye, // Ajout de l'icône de l'œil ouvert
  HiOutlineEyeOff,
} from "react-icons/hi";
import { MdErrorOutline } from "react-icons/md";
import { motion } from "framer-motion";
import s from "./connexion.module.css";


type FormValues = {
  email: string;
  password: string;

};

const Connexion: React.FC = () => {
  
  const [errorMessage, setErrorMessage] = useState("");
    
      const [showPassword, setShowPassword] = useState(false);


  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email invalide").required("L'email est requis"),
    password: Yup.string()
      .min(6, "Le mot de passe doit comporter au moins 6 caractères")
      .required("Le mot de passe est requis"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);

  };

  return (
    <Fragment>
      <div
        className={` ${s.arriereplan} flex flex-row h-screen justify-center overflow-hidden `}
      >
        <div className={` relative  hidden lg:block md:w-1/2 `}>
          <h1 className="text-black absolute text-3xl font-bold left-5 top-3">
            L<span className="text-[#5a8bdb]">o</span>go
          </h1>
          <img src="./assets/image/deco/logdeco.png" alt="" />
        </div>

        <div
          className={`${s.droite} w-full lg:w-1/2 flex flex-col justify-center items-center relative`}
        >
          <h2 className="text-white text-4xl font-bold mb-6">Se Connecter</h2>

          <form
            className={` rounded-lg p-8 mb-4 w-3/4 lg:w-2/4 max-w-lg`}
            onSubmit={handleSubmit(onSubmit)}
          >
            {errorMessage && (
              <motion.div
                className="flex items-center text-red-500 text-sm mb-4 bg-red-100 p-3 rounded-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <MdErrorOutline className="w-5 h-5 mr-2" />
                {errorMessage}
              </motion.div>
            )}

            <div className="mb-6 relative">
              <label
                htmlFor="email"
                className="block text-sm font-bold mb-2 text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="exemple@domaine.com"
                className="shadow-inner pr-12 rounded-full appearance-none border w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-200"
                {...register("email")}
              />
              <HiOutlineMail className="absolute right-3 top-10 text-gray-500 w-6 h-6" />
              {errors.email && (
                <div className="text-xs italic text-red-500">
                  {errors.email.message}
                </div>
              )}
            </div>

            <div className="mb-6 relative">
              <label
                htmlFor="password"
                className="block text-sm font-bold mb-2 text-white"
              >
                Mot de passe
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                // placeholder="••••••••"
                placeholder="Entrez votre mot de passe"
                className="shadow-inner pr-12 rounded-full appearance-none border w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-200"
                {...register("password")}
              />

              <div
                className="absolute right-3 top-10 text-gray-500 w-6 h-6"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <HiOutlineEye className="w-6 h-6" />
                ) : (
                  <HiOutlineEyeOff className="w-6 h-6" />
                )}
              </div>

              {errors.password && (
                <div className="text-xs text-red-500">
                  {errors.password.message}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="bg-[#759eee] hover:bg-gradient-to-r hover:from-[#5a8bdb] hover:to-[#a1bdfc] text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline w-full transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Se connecter
            </button>
          </form>
          <h2 className="text-white mt-4">
            Vous n'avez pas de compte ?{" "}
            <Link to={"/inscription"}
              className="text-[#f8c53b] font-semibold hover:text-[#ffd866] hover:underline transition-colors duration-300 ease-in-out hover:shadow-lg hover:shadow-yellow-300/30 px-1 rounded"
            >
              Créez en un !
            </Link>
          </h2>
        </div>
      </div>
    </Fragment>
  );
};

export default Connexion;
