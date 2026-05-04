
import { View, TouchableOpacity, Text } from "react-native";

export default function ActionButtons({ onMarkAll, onDeleteCompleted }) {
  return (
    <View className="flex-row justify-between mb-4">
      <TouchableOpacity
        onPress={onMarkAll}
        className="bg-green-500 p-2 rounded"
      >
        <Text className="text-white">Mark All</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onDeleteCompleted}
        className="bg-red-500 p-2 rounded"
      >
        <Text className="text-white">Clear Completed</Text>
      </TouchableOpacity>
    </View>
  );
}