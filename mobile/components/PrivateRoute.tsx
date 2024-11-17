// src/components/PrivateRoute.tsx
import React, { useEffect } from "react";
import { router } from "expo-router";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, [user]);

  return <>{children}</>; // Render the protected route if authenticated
};

export default PrivateRoute;
