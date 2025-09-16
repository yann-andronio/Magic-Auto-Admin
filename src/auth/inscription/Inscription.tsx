import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import { MdErrorOutline } from "react-icons/md";
import { motion } from "framer-motion";
import s from "./inscription.module.css";

type FormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Inscription: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Le nom complet est requis"),
    email: Yup.string().email("Email invalide").required("L'email est requis"),
    password: Yup.string().min(6, "Le mot de passe doit comporter au moins 6 caractères").required("Le mot de passe est requis"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")],"Les mots de passe ne correspondent pas").required("La confirmation est requise"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
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
        <div
          className={` w-full lg:w-1/2 flex flex-col justify-center items-center relative`}
        >
          <h2 className="text-white text-4xl font-bold mb-6">Inscription</h2>

          <form
            className={` rounded-lg p-8 mb-4 w-2/4 max-w-lg`}
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

            {/* Nom complet */}
            <div className="mb-6 relative">
              <label
                htmlFor="fullName"
                className="block text-sm font-bold mb-2 text-white"
              >
                Nom complet
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Votre nom complet"
                className="shadow-inner rounded-full appearance-none border w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-200"
                {...register("fullName")}
              />
              {errors.fullName && (
                <div className="text-xs italic text-red-500">
                  {errors.fullName.message}
                </div>
              )}
            </div>

            {/* Email */}
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
                className="shadow-inner rounded-full appearance-none border w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-200"
                {...register("email")}
              />
              <HiOutlineMail className="absolute right-3 top-10 text-gray-500 w-6 h-6" />
              {errors.email && (
                <div className="text-xs italic text-red-500">
                  {errors.email.message}
                </div>
              )}
            </div>

            {/* Mot de passe */}
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
                placeholder="Entrez votre mot de passe"
                className="shadow-inner rounded-full appearance-none border w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-200"
                {...register("password")}
              />
              <div
                className="absolute right-3 top-10 text-gray-500 w-6 h-6 cursor-pointer"
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

            {/* Confirmation du mot de passe */}
            <div className="mb-6 relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-bold mb-2 text-white"
              >
                Confirmer le mot de passe
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirmez votre mot de passe"
                className="shadow-inner rounded-full appearance-none border w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-200"
                {...register("confirmPassword")}
              />
              <div
                className="absolute right-3 top-10 text-gray-500 w-6 h-6 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <HiOutlineEye className="w-6 h-6" />
                ) : (
                  <HiOutlineEyeOff className="w-6 h-6" />
                )}
              </div>
              {errors.confirmPassword && (
                <div className="text-xs text-red-500">
                  {errors.confirmPassword.message}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="bg-[#fdb73d] hover:bg-gradient-to-r hover:from-[#f59e0b] hover:to-[#facc15] text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline w-full transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              S'inscrire
            </button>
          </form>

          <h2 className="text-white mt-4">
            Vous avez déjà un compte ?{" "}
            <Link
              to={"/"}
              className="text-[#f8c53b] font-semibold hover:text-[#ffd866] hover:underline transition-colors duration-300 ease-in-out hover:shadow-lg hover:shadow-yellow-300/30 px-1 rounded"
            >
              se connecter!
            </Link>
          </h2>
        </div>

        <div className={` hidden lg:block md:w-1/2 `}>
          <h1 className="text-black absolute text-3xl font-bold right-5 top-3">
            L<span className="text-[#5a8bdb]">o</span>go
          </h1>
          <img src="./assets/image/deco/inscritdeco.png" alt="" />
        </div>
      </div>
    </Fragment>
  );
};

export default Inscription;
