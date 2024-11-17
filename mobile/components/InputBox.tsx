import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

const InputBox = ({
  textValue,
  handleTextChange,
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
  textValue: string;
  handleTextChange: (text: string) => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="relative my-1.5">
      <Text className="dark:text-white my-2 text-base">{label}</Text>
      <TextInput
        onChangeText={handleTextChange}
        value={textValue}
        placeholder={placeholder}
        placeholderTextColor="#6b7280"
        secureTextEntry={label.toLowerCase() === "password" && !showPassword}
        className="dark:text-gray-400 border border-gray-600 rounded px-3 py-3"
      />
      {label.toLowerCase() === "password" && (
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          className="absolute top-[60%] right-3"
        >
          <Image
            source={!showPassword ? icons.eye : icons.eyeHide}
            className="w-6 h-6"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputBox;
