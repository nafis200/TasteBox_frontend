
import RegisterForm from '@/components/modules/auth/register/RegisterForm';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Taste_Box_Register",
    description: "Meal Shop restaurant Register Page",
    icons: {
    icon: "/faviconz.ico", 
  },
  };
const RegisterPage = () => {
    return (
        <div>
            <RegisterForm/>
        </div>
    );
};

export default RegisterPage;