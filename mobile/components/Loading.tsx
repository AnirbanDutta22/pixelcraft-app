import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const Loading = () => {
  return (
    <View className="flex-1 items-center justify-center fixed">
      <ActivityIndicator size="large" color="#1d90f0" />
      <Text>Loading...</Text>
    </View>
  );
};

export default Loading;
