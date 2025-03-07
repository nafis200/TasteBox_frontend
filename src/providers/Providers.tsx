"use client";

import UserProvider from "@/context/UserContext";
import StoreProvider from "./StoreProviders";


const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <StoreProvider>{children}</StoreProvider>
    </UserProvider>
  );
};

export default Providers;
