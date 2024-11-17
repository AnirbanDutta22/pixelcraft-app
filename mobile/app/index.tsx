import { CustomButton } from "@/components";
import { Link, router } from "expo-router";
import { Button, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Welcome() {
  return (
    <SafeAreaView className="relative h-full bg-white dark:bg-[#151718]">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full px-4">
          <Text className="text-4xl font-pextrabold dark:text-white">
            PixelCraft
          </Text>
          <Text className="dark:text-lime-500 font-pregular">
            Unleash Your Imagination in Every Frame!
          </Text>
          <CustomButton
            title="Get Started"
            handlePress={() => router.push("/home")}
            customStyles=""
          />
          <Text className="absolute top-[90%] -translate-y-[90%] dark:text-white text-xs">
            Don't have any account ?
            <Text
              onPress={() => router.push("/signupEmail")}
              className="dark:text-lime-500 text-lime-600 text-xs"
            >
              {" "}
              Create an account
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
