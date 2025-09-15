import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const navigationLinks = [
  { name: "Accueil", id: "Accueil" },
  { name: "A propos", id: "A propos" },
  { name: "Services", id: "Services" },
  { name: "Projets", id: "Projet" },
  { name: "Contact", id: "Contact" },
  { name: "FAQ", id: "FAQ" },
];

const sociallinks = [
  { icon: <FaFacebookF />, url: "https://facebook.com" },
  { icon: <FaInstagram />, url: "https://instagram.com" },
  { icon: <FaTwitter />, url: "https://twitter.com" },
  { icon: <FaLinkedinIn />, url: "https://linkedin.com" },
];

const Footer: React.FC = () => {
  return (
  
    <footer className="relative mt-40 text-white">
      <div className="pt-16 pb-6 max-w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-6">
        {/* Logo */}
        <div className="flex flex-col items-start md:col-span-1">
          <a href="/" className="text-3xl font-extrabold text-white mb-4">
            Magic<span className="text-yellow-400"> Auto</span>
          </a>
          <p className="text-white/80 text-sm">
            Votre partenaire de confiance pour un service auto de qualité.
          </p>
        </div>

    
        <div className="md:col-span-1">
          <h2 className="text-xl font-bold text-white mb-4">Navigation</h2>
          <ul className="space-y-2 text-sm">
            {navigationLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.id}
                  className="cursor-pointer text-white/80 hover:text-yellow-400 transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

       
        <div className="md:col-span-1">
          <h2 className="text-xl font-bold text-white mb-4">Réseaux sociaux</h2>
          <p className="text-sm text-white/80 mb-4">
            Suivez-nous pour ne rien rater de nos offres.
          </p>
          <div className="flex space-x-4">
            {sociallinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-yellow-400 text-xl transition"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-white/20 pt-6 text-center text-sm text-white/80">
        © {new Date().getFullYear()} Magic Auto. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
