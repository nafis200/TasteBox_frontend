import { Metadata } from "next";
import LoginForm from '@/components/modules/auth/login/LoginForm';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: "Login Page",
  description: "Meal Shop restaurant Login Page",
};

const LoginPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default LoginPage;
