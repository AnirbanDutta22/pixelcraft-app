import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";

import { icons } from "../constants";

const SearchBox = ({ placeholder }: { placeholder: string }) => {
  return (
    <View className="flex flex-row items-center space-x-4 w-full h-fit px-4 bg-black-100 rounded-xl border-2 border-gray-600 focus:border-secondary">
      <TextInput
        className="text-base mt-1 text-white flex-1 font-pregular"
        placeholder={placeholder}
        placeholderTextColor="#6c7178"
      />

      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBox;
