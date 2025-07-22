import ContactMe from '@/components/modules/Contact/Contact';
import React from 'react';
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Taste_box_Contact",
  description: "Meal Shop restaurant",
   icons: {
    icon: "/faviconz.ico", 
  },
};
const ContactPage = () => {
    return (
        <div>
            <ContactMe/>
        </div>
    );
};

export default ContactPage;