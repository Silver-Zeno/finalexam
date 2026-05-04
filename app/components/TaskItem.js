import { View, Text, TouchableOpacity } from "react-native";

export default function TaskItem({ item, onToggle, onDelete }) {
  return (
    <View className="flex-row justify-between p-3 bg-white mb-2 rounded">
      <TouchableOpacity onPress={() => onToggle(item.id)}>
        <Text className={item.completed ? "line-through text-gray-400" : ""}>
          {item.text}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onDelete(item.id)}>
        <Text className="text-red-500">Delete</Text>
      </TouchableOpacity>
    </View>
  );
}