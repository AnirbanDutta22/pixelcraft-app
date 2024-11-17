import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton, CustomButton2 } from "@/components";
import { Link, router, useLocalSearchParams } from "expo-router";
import InputBox from "@/components/InputBox";
import { icons } from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/features/auth/authSlice";
import { AppDispatch } from "@/store";
import AuthPrivateRoute from "@/components/AuthPrivateRoute";

const SignupSetPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: any) => state.auth);
  const { email } = useLocalSearchParams();
  const [formValues, setFormValues] = useState({
    email: email,
    password: "",
  });

  const [isValidationError, setValidationError] = useState("");

  const submitForm = async () => {
    if (formValues.password) {
      const res = await dispatch(register(formValues));
      // console.log(formValues);
      if (res && res.payload) {
        router.push("/signin");
      }
    } else {
      setValidationError("Password is required !");
    }
  };

  const handleTextChange = (event: any) => {
    setFormValues({ ...formValues, password: event });
    if (isValidationError) {
      setValidationError("");
    }
  };

  return (
    <AuthPrivateRoute>
      <SafeAreaView className="relative h-full my-auto bg-white dark:bg-[#151718]">
        {!loading ? (
          <ScrollView contentContainerStyle={{ height: "100%" }}>
            <View className="px-2 mb-6">
              <TouchableOpacity onPress={() => router.push("../")}>
                <Image
                  source={icons.leftArrow2}
                  className="w-12 h-12"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View className="w-full h-full px-4">
              <Text className="text-3xl font-pmedium dark:text-white">
                Set your <Text className="text-lime-500">PixelCraft</Text>{" "}
                Password
              </Text>
              <InputBox
                label="Password"
                placeholder="Your Password"
                textValue={formValues.password}
                handleTextChange={handleTextChange}
              />
              {isValidationError && (
                <Text className="text-red-400 ">{isValidationError}</Text>
              )}
              {error && error.message && (
                <Text className="text-red-400 ">{error.message}</Text>
              )}
              <CustomButton
                title="Sign up"
                handlePress={submitForm}
                customStyles="my-5"
              />
              <View className="flex-grow w-11/12 self-center">
                <Text className="text-gray-600 text-center">
                  Already have an account ?{" "}
                  <Link href="/signin" className="text-lime-500">
                    Sign in
                  </Link>
                </Text>
              </View>
            </View>
          </ScrollView>
        ) : (
          <View>
            <Text className="dark:text-white">Loading...</Text>
          </View>
        )}
      </SafeAreaView>
    </AuthPrivateRoute>
  );
};

export default SignupSetPassword;
