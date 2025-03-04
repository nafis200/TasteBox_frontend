
import type { Metadata } from "next";
import LoginForm from '@/components/modules/auth/login/LoginForm';
export const metadata: Metadata = {
    title: "Login Page",
    description: "Meal Shop restaurant Login Page",
  };
  

const LoginPage = () => {
    return (
        <div>
            <LoginForm/>
        </div>
    );
};

export default LoginPage;