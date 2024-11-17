import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="signin" options={{ headerShown: false }} />
        <Stack.Screen name="signupEmail" options={{ headerShown: false }} />
        <Stack.Screen
          name="signupSetPassword"
          options={{ headerShown: false }}
        />
      </Stack>
    </>
  );
};

export default AuthLayout;
