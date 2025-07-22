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
    <div className="min-h-screen py-20 px-6 flex justify-center items-center bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-4xl flex flex-col items-center justify-center gap-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Get in Touch With Us
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Have a question, feedback, or just want to say hello? We’re here to
            help!
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-base mt-4 max-w-3xl mx-auto leading-relaxed">
            Are you craving something mouthwatering or need help with a recent
            order? Whether you are curious about our daily specials, want to
            customize a meal, or have feedback to share — we are here and happy
            to assist. At{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              MealShop
            </span>
            , we dont just serve meals — we serve experiences. Crafted with
            care, passion, and a dash of love. Your satisfaction is our top
            priority, and were always just a message away.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { icon: FaMapMarkerAlt, label: "Dhaka, Bangladesh" },
            { icon: FaPhoneAlt, label: "+8801922208141" },
            { icon: FaWhatsapp, label: "+8801744136454" },
            { icon: FaTelegramPlane, label: "@mealshop_support" },
            { icon: FaEnvelope, label: "support@mealshop.com" },
            { icon: FaClock, label: "Open Daily: 10:00 AM - 10:00 PM" },
          ].map(({ icon: Icon, label }, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 rounded-xl bg-white/60 dark:bg-gray-800/70 backdrop-blur-md shadow-sm hover:shadow-md transition text-gray-800 dark:text-gray-200"
            >
              <Icon size={22} className="text-blue-600 dark:text-blue-400" />
              <span className="text-base font-medium">{label}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-6 mt-6">
          <a
            href="https://www.linkedin.com/in/n-ahamed"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700 dark:hover:text-blue-400 transition"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn size={28} />
          </a>

          <a
            href="https://github.com/nafis200"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-800 dark:hover:text-gray-200 transition"
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
