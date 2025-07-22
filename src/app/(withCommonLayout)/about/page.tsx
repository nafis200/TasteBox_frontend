import AboutMealShop from '@/components/modules/AboutShop/AboutShop';
import React from 'react';
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Taste_box_About",
  description: "Meal Shop restaurant",
   icons: {
    icon: "/faviconz.ico", 
  },
};

const AboutSection = () => {
    return (
        <div>
            <AboutMealShop/>
        </div>
    );
};

export default AboutSection;