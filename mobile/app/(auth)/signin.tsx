import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton, CustomButton2 } from "@/components";
import { Link, router } from "expo-router";
import InputBox from "@/components/InputBox";
import { icons } from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/features/auth/authSlice";
import { AppDispatch } from "@/store";
import AuthPrivateRoute from "@/components/AuthPrivateRoute";

const Signin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: any) => state.auth);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [isValidationError, setValidationError] = useState({
    emailError: "",
    passwordError: "",
  });

  const onFormSubmit = () => {
    if (!formValues.email) {
      setValidationError({
        ...isValidationError,
        emailError: "Email is required !",
      });
      return;
    }
    if (!formValues.password) {
      setValidationError({
        ...isValidationError,
        passwordError: "Password is required !",
      });
      return;
    }
    dispatch(login(formValues));
    router.push("/profile");
  };

  const handleEmailChange = (event: any) => {
    setFormValues({ ...formValues, email: event });
    if (isValidationError.emailError) {
      setValidationError({
        ...isValidationError,
        emailError: "",
      });
    }
  };

  const handlePasswordChange = (event: any) => {
    setFormValues({ ...formValues, password: event });
    if (isValidationError.passwordError) {
      setValidationError({
        ...isValidationError,
        passwordError: "",
      });
    }
  };

  const handleNavigation = () => {
    if (!user) {
      router.push("/");
    } else {
      router.push("../");
    }
  };

  return (
    <AuthPrivateRoute>
      <SafeAreaView className="relative h-full my-auto bg-white dark:bg-[#151718]">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="px-2 mb-6">
            <TouchableOpacity onPress={handleNavigation}>
              <Image
                source={icons.leftArrow2}
                className="w-12 h-12"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View className="w-full h-full px-4">
            <Text className="text-3xl font-pmedium dark:text-white">
              Sign in to PixelCraft
            </Text>
            <Text className="dark:text-lime-500 font-pregular">
              Hey ! Happy to see u here again !
            </Text>
            <InputBox
              label="Email"
              placeholder="hello@company.com"
              textValue={formValues.email}
              handleTextChange={handleEmailChange}
            />
            {isValidationError.emailError && (
              <Text className="text-red-400 ">
                {isValidationError.emailError}
              </Text>
            )}
            <InputBox
              label="Password"
              placeholder="Your Password"
              textValue={formValues.password}
              handleTextChange={handlePasswordChange}
            />
            {isValidationError.passwordError && (
              <Text className="text-red-400 ">
                {isValidationError.passwordError}
              </Text>
            )}
            <Text className="my-3 text-lime-700 dark:text-lime-500">
              Forgot Password ?
            </Text>
            <CustomButton
              title="Sign in"
              handlePress={onFormSubmit}
              customStyles=""
            />
            <View className="relative">
              <View className="bg-gray-600 my-5 w-full h-[1px] z-0"></View>
              <Text className="absolute top-1 left-[45%] text-gray-600 p-2 z-10 bg-white dark:bg-[#151718]">
                OR
              </Text>
            </View>
            <CustomButton2
              title="Continue with Google"
              handlePress={() => router.push("/")}
              icon={icons.google}
              customStyles=""
              customImageStyles=""
            />
            <View className="mt-36 w-11/12 self-center">
              <Text className="text-gray-600 text-center">
                PixelCraft uses cookies for analytics personalized content and
                ads. By using PixelCraft's services you agree to this use of
                cookies.{" "}
                <Link href="/" className="text-lime-700 dark:text-white">
                  Learn More
                </Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </AuthPrivateRoute>
  );
};

export default Signin;
