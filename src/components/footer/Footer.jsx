import React from "react";
import { Link } from "react-router-dom";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="py-4 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between">
        
        {/* Logo & Copyright */}
        <div className="flex items-center space-x-4">
          <Logo width="100px" className="animate-fadeIn" />
          <p className="text-sm text-gray-200">
            &copy; {new Date().getFullYear()} E-Gallery. All Rights Reserved.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 text-sm">
          {["Features", "Pricing", "Help", "Privacy Policy"].map((item, index) => (
            <Link key={index} className="hover:text-gray-300 transition-all" to="/">
              {item}
            </Link>
          ))}
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-4">
          {[FiFacebook, FiTwitter, FiInstagram, FiLinkedin].map((Icon, index) => (
            <a key={index} href="#" className="hover:text-gray-300 transition">
              <Icon size={18} />
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}

export default Footer;
