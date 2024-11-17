import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton, CustomButton2 } from "@/components";
import { Link, router } from "expo-router";
import InputBox from "@/components/InputBox";
import { icons } from "@/constants";

const SignupEmail = () => {
  const [formValues, setFormValues] = useState({
    email: "",
  });

  const [isValidationError, setValidationError] = useState("");

  // const handle
  useEffect(() => {}, [formValues.email]);

  const handleEmailSubmit = () => {
    if (formValues.email) {
      router.push({
        pathname: "signupSetPassword",
        params: { email: formValues.email },
      });
    } else {
      setValidationError("Email is required !");
    }
  };

  const handleTextChange = (event: any) => {
    setFormValues({ ...formValues, email: event });
    // Clear validation error on text change
    if (isValidationError) {
      setValidationError(""); // Reset validation error
    }
  };

  return (
    <SafeAreaView className="relative h-full my-auto bg-white dark:bg-[#151718]">
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
            Get your free account
          </Text>
          <Text className="dark:text-lime-500 font-pregular">
            Welcome to PixelCraft !
          </Text>
          <CustomButton2
            title="Continue with Google"
            handlePress={() => router.push("/")}
            icon={icons.google}
            customStyles=""
            customImageStyles=""
          />
          <View className="relative">
            <View className="bg-gray-600 my-5 w-full h-[1px] z-0"></View>
            <Text className="absolute top-1 left-[45%] text-gray-600 p-2 z-10 bg-white dark:bg-[#151718]">
              OR
            </Text>
          </View>
          <InputBox
            label="Work Email*"
            placeholder="hello@company.com"
            textValue={formValues.email}
            handleTextChange={handleTextChange}
          />
          {isValidationError && (
            <Text className="text-red-400 ">{isValidationError}</Text>
          )}
          <CustomButton
            title="Continue with Email"
            handlePress={handleEmailSubmit}
            customStyles="my-5"
          />
          <View className="flex-grow w-11/12 self-center">
            <Text className="text-gray-600 text-center">
              Already have an account ?{" "}
              <Link href="/signin" className="text-lime-700 dark:text-lime-500">
                Sign in
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupEmail;
