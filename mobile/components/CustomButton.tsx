import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
} from "react-native";

const CustomButton = ({
  handlePress,
  title,
  customStyles,
}: {
  title: string;
  customStyles: string;
  handlePress: any;
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`my-3 justify-center items-center py-2 px-5 bg-lime-600 dark:bg-lime-500 rounded ${customStyles}`}
    >
      <Text className="font-pmedium text-white dark:text-black">{title}</Text>
    </TouchableOpacity>
  );
};

const CustomButton2 = ({
  handlePress,
  title,
  customStyles,
  customImageStyles,
  icon,
}: {
  title: string;
  customStyles: string;
  customImageStyles: string;
  handlePress: any;
  icon: ImageSourcePropType;
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`my-3 flex-row items-center py-2 px-5 bg-transparent border border-black dark:border-gray-600 rounded ${customStyles}`}
    >
      <Image
        source={icon}
        resizeMode="contain"
        className={`w-5 h-5 ${customImageStyles}`}
      />
      <Text className="-ml-6 flex-1 text-center font-pmedium text-black dark:text-white">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export { CustomButton2 };
export default CustomButton;
