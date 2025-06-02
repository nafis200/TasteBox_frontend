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
    <div className="min-h-screen py-16 px-6 flex justify-center items-center bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full flex flex-col items-center justify-center gap-10">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Get in Touch With Us
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Have a question, feedback, or just want to say hello? We’re here to help!
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-lg mt-3">
            Are you craving something mouthwatering or need help with a recent order? Whether you are curious about our daily specials, want to customize a meal, have feedback to share, or are planning an event and need catering — we are here and happy to assist. At MealShop, we dont just serve meals — we serve experiences, crafted with care, passion, and a dash of love. Our commitment to freshness, flavor, and customer satisfaction drives everything we do. No matter the reason, dont hesitate to reach out — your satisfaction is our top priority, and we&apos;re always just a message away.
          </p>
        </div>

        <div className="w-full space-y-6">
          {[
            { icon: FaMapMarkerAlt, label: "Dhaka, Bangladesh" },
            { icon: FaPhoneAlt, label: "+8801922208141" },
            { icon: FaWhatsapp, label: "+8801744136454" },
            { icon: FaTelegramPlane, label: "+8801922208141" },
            { icon: FaEnvelope, label: "support@mealshop.com" },
            { icon: FaClock, label: "Open Daily: 10:00 AM - 10:00 PM" },
          ].map(({ icon: Icon, label }, i) => (
            <div key={i} className="flex justify-center items-center gap-4 text-lg text-gray-700 dark:text-gray-300">
              <Icon size={24} />
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-6 mt-8">
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
