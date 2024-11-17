import { router } from "expo-router";
import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton, InputBox, SearchBox } from "@/components";
import { useSelector } from "react-redux";

const HomeScreen: React.FC = () => {
  const { loading, error, user } = useSelector((state: any) => state.auth);
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#151718] p-4">
      {!loading ? (
        <>
          <View className="flex justify-between mb-4">
            <Text className="text-3xl font-pextrabold dark:text-lime-500">
              PixelCraft
            </Text>
            <Text className="text-black dark:text-white font-pregular text-base">
              {user !== null
                ? `Welcome back, ${user.username}`
                : "Welcome User ! Please Sign in"}{" "}
              !
            </Text>
          </View>
          <SearchBox placeholder="Search a video topic" />
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
              Be the first creator of PixelCraft
            </Text>
            <CustomButton
              title="+ Create one"
              customStyles="mx-auto w-56"
              handlePress={() => router.push("/create")}
            />
          </View>
        </>
      ) : (
        <View>
          <Text className="dark:text-white">Loading...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
