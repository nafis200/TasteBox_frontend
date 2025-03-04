
import RegisterForm from '@/components/modules/auth/register/RegisterForm';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Register Page",
    description: "Meal Shop restaurant Register Page",
  };
const RegisterPage = () => {
    return (
        <div>
            <RegisterForm/>
        </div>
    );
};

export default RegisterPage;