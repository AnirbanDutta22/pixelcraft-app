import { Link, router } from "expo-router";
import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton, InputBox, SearchBox } from "@/components";
import PrivateRoute from "@/components/PrivateRoute";

const Gallery: React.FC = () => {
  return (
    <PrivateRoute>
      <SafeAreaView className="flex-1 bg-white dark:bg-[#151718] p-4">
        <View className="flex justify-between mb-4">
          <Text className="text-2xl font-psemibold dark:text-lime-500">
            Your Gallery
          </Text>
        </View>
        <SearchBox placeholder="Search your saved videos" />
        {/* Empty State */}
        <View className="my-auto h-56 w-full">
          <Image
            source={require("@/assets/images/empty.png")}
            className="w-full h-full"
            resizeMode="contain"
          />
          <Text className="text-lg text-white text-center font-pmedium">
            No videos found
          </Text>
          <Text className="text-xs text-gray-500 text-center font-pmedium">
            Save videos to your gallery
          </Text>
          <CustomButton
            title="Back to Explore"
            customStyles="mx-auto w-56"
            handlePress={() => router.push("/home")}
          />
        </View>
      </SafeAreaView>
    </PrivateRoute>
  );
};

export default Gallery;
