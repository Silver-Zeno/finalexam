import { View, Text, Pressable } from "react-native";
import { Task } from "../../types/Task";

export default function TaskItem({
  task,
  onToggle,
  onDelete,
}: {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}) {
  return (
    <View className="mb-2 flex-row items-center justify-between rounded-md border border-gray-300 p-3">
      <Pressable
        onPress={onToggle}
        className={`h-5 w-5 items-center justify-center rounded border ${
          task.completed ? "border-black bg-black" : "border-gray-500"
        }`}
      >
        {task.completed && <Text className="text-white text-xs">✓</Text>}
      </Pressable>

      <Text
        className={`flex-1 ml-3 text-base ${
          task.completed ? "text-gray-400 line-through" : "text-black"
        }`}
      >
        {task.title}
      </Text>

      <Pressable onPress={onDelete} className="ml-3 rounded px-2 py-1">
        <Text className="text-base text-red-500">Delete</Text>
      </Pressable>
    </View>
  );
}