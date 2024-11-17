import { Image, Text, View } from "react-native";
import React from "react";
import { Slot, Tabs } from "expo-router";

import { icons } from "../../constants";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2 w-20 h-full mt-4">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className={`${focused ? "w-6 h-6" : "w-5 h-5"}`}
      />
      <Text
        className={`text-sm text-yellow-800 dark:text-white ${
          focused ? "font-psemibold" : "font-pregular"
        }`}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#84cc16",
        tabBarStyle: {
          backgroundColor: "#151718",
          height: 64,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            return (
              <TabIcon
                name="Home"
                icon={icons.home}
                color={color}
                focused={focused}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            return (
              <TabIcon
                name="Create"
                icon={icons.plus}
                color={color}
                focused={focused}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="gallery"
        options={{
          title: "Gallery",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            return (
              <TabIcon
                name="Gallery"
                icon={icons.bookmark}
                color={color}
                focused={focused}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => {
            return (
              <TabIcon
                name="Profile"
                icon={icons.profile}
                color={color}
                focused={focused}
              />
            );
          },
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
