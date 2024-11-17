// src/components/PrivateRoute.tsx
import React, { useEffect } from "react";
import { router } from "expo-router";
import { useSelector } from "react-redux";

const AuthPrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (user) {
      router.push("/home");
    }
  }, [user]);

  return <>{children}</>;
};

export default AuthPrivateRoute;
