import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity, Text } from "react-native";

import { icons } from "../../constants";
import { CustomButton } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import { AppDispatch } from "@/store";
import PrivateRoute from "@/components/PrivateRoute";

const ProfileScreen: React.FC = () => {
  const { loading, error, user } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <PrivateRoute>
      <SafeAreaView className="flex-1 items-center bg-white dark:bg-[#151718] p-4">
        {!loading ? (
          <>
            <View className="flex justify-center items-center mt-6">
              <View className="border-2 border-lime-500 rounded-full p-2">
                <Image
                  source={require("@/assets/images/profile.jpg")}
                  className="w-20 h-20 rounded-full"
                  resizeMode="cover"
                />
              </View>
              <Text className="mt-3 text-xl font-psemibold dark:text-lime-500">
                {user !== null && user.username}
              </Text>
              <View className="flex flex-row mt-3 space-x-5">
                <View>
                  <Text className="text-lg text-white text-center font-pmedium">
                    00
                  </Text>
                  <Text className="text-sm text-gray-400 text-center font-pregular">
                    Posts{" "}
                  </Text>
                </View>
                <View>
                  <Text className="text-lg text-white text-center font-pmedium">
                    00
                  </Text>
                  <Text className="text-sm text-gray-400 text-center font-pregular">
                    Likes{" "}
                  </Text>
                </View>
              </View>
            </View>
            {/* Empty State */}
            <View className="h-56 w-full">
              <Image
                source={require("@/assets/images/empty.png")}
                className="w-full h-full"
                resizeMode="contain"
              />
              <Text className="text-sm text-gray-300 text-center font-pmedium">
                No videos found
              </Text>
              <CustomButton
                title="+ Create one"
                customStyles="mx-auto w-56"
                handlePress={() => router.push("/create")}
              />
            </View>
            <TouchableOpacity
              onPress={handleLogout}
              className="absolute top-5 right-5"
            >
              <Image
                source={icons.logout}
                className="w-5 h-5"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </>
        ) : (
          <View>
            <Text className="dark:text-white">Loading...</Text>
          </View>
        )}
      </SafeAreaView>
    </PrivateRoute>
  );
};

export default ProfileScreen;
