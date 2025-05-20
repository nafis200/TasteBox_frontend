"use client";

import {
  FaLinkedinIn,
  FaGithub,
  FaWhatsapp,
  FaTelegramPlane,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaEnvelope,
} from "react-icons/fa";

const ContactMe = () => {
  return (
    <div className="min-h-screen py-16 px-6 flex justify-center items-center bg-gradient-to-br from-white to-blue-50">
      <div className="w-full max-w-4xl flex flex-col items-center justify-center gap-10">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Get in Touch With Us
          </h2>
          <p className="text-gray-600 text-lg">
            Have a question, feedback, or just want to say hello? We’re here to help!
          </p>
        </div>

        <div className="w-full space-y-6">
          <div className="flex items-center gap-4 text-lg text-gray-700">
            <FaMapMarkerAlt size={24} />
            <span>Dhaka, Bangladesh</span>
          </div>

          <div className="flex items-center gap-4 text-lg text-gray-700">
            <FaPhoneAlt size={24} />
            <span>+8801922208141</span>
          </div>

          <div className="flex items-center gap-4 text-lg text-gray-700">
            <FaWhatsapp size={24} />
            <span>+8801744136454</span>
          </div>

          <div className="flex items-center gap-4 text-lg text-gray-700">
            <FaTelegramPlane size={24} />
            <span>+8801922208141</span>
          </div>

          <div className="flex items-center gap-4 text-lg text-gray-700">
            <FaEnvelope size={24} />
            <span>support@mealshop.com</span>
          </div>

          <div className="flex items-center gap-4 text-lg text-gray-700">
            <FaClock size={24} />
            <span>Open Daily: 10:00 AM - 10:00 PM</span>
          </div>
        </div>

        <div className="flex gap-6 mt-8">
          <a
            href="https://www.linkedin.com/in/n-ahamed"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700 transition"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn size={28} />
          </a>

          <a
            href="https://github.com/nafis200"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-800 transition"
            aria-label="GitHub"
          >
            <FaGithub size={28} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
