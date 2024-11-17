import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton, CustomButton2 } from "@/components";
import { Link, router } from "expo-router";
import InputBox from "@/components/InputBox";
import { icons } from "@/constants";
import { ResizeMode, Video } from "expo-av";
import PrivateRoute from "@/components/PrivateRoute";

const Create = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    video: null,
    thumbnail: null,
  });

  const [isValidationError, setValidationError] = useState({
    emailError: "",
    passwordError: "",
    videoError: "",
    thumbnailError: "",
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
    router.push("/");
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

  const handleVideoChange = (event: any) => {
    setFormValues({ ...formValues, video: event });
    if (isValidationError.videoError) {
      setValidationError({
        ...isValidationError,
        videoError: "",
      });
    }
  };

  return (
    <PrivateRoute>
      <SafeAreaView className="relative h-full my-auto bg-white dark:bg-[#151718] p-4">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="w-full h-full">
            <Text className="text-2xl font-psemibold dark:text-lime-500">
              Upload Video
            </Text>
            <InputBox
              label="Video title"
              placeholder="Give a catchy title for your video..."
              textValue={formValues.email}
              handleTextChange={handleEmailChange}
            />
            {isValidationError.emailError && (
              <Text className="text-red-400 ">
                {isValidationError.emailError}
              </Text>
            )}
            <InputBox
              label="AI Prompt"
              placeholder="The AI prompt of your video..."
              textValue={formValues.password}
              handleTextChange={handlePasswordChange}
            />
            {isValidationError.passwordError && (
              <Text className="text-red-400 ">
                {isValidationError.passwordError}
              </Text>
            )}
            <View className="relative my-1.5">
              <Text className="dark:text-white my-2 text-base">
                Upload Video
              </Text>
              <TouchableOpacity>
                {formValues.video ? (
                  <Video
                    source={{ uri: formValues.video }}
                    className="w-full h-64 rounded-2xl"
                    useNativeControls
                    resizeMode={ResizeMode.COVER}
                    isLooping
                  />
                ) : (
                  <View className="w-full h-40 px-4 bg-black-100 rounded border border-gray-600 flex justify-center items-center">
                    <View className="w-14 h-14 border border-dashed border-gray-400 flex justify-center items-center">
                      <Image
                        source={icons.upload}
                        resizeMode="contain"
                        alt="upload"
                        className="w-1/2 h-1/2"
                      />
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            {isValidationError.videoError && (
              <Text className="text-red-400 ">
                {isValidationError.videoError}
              </Text>
            )}
            <View className="relative my-1.5">
              <Text className="dark:text-white my-2 text-base">
                Thumbnail Image
              </Text>
              <TouchableOpacity>
                {formValues.thumbnail ? (
                  <Image
                    source={{ uri: formValues.thumbnail }}
                    resizeMode="cover"
                    className="w-full h-64 rounded-2xl"
                  />
                ) : (
                  <View className="w-full h-16 px-4 bg-black-100 rounded border border-gray-600 flex justify-center items-center flex-row space-x-2">
                    <Image
                      source={icons.upload}
                      resizeMode="contain"
                      alt="upload"
                      className="w-5 h-5"
                    />
                    <Text className="text-sm text-gray-400 font-pmedium">
                      Choose a file
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <CustomButton
              title="Publish"
              handlePress={onFormSubmit}
              customStyles=""
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </PrivateRoute>
  );
};

export default Create;
