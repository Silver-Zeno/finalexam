import { View, Text } from "react-native";

export default function StatsPanel({
  total,
  completed,
}: {
  total: number;
  completed: number;
}) {
  const pending = total - completed;

  return (
    <View className="flex-row justify-between rounded-md border border-gray-300 px-3 py-2">
      <Text className="text-gray-700">Total: {total}</Text>
      <Text className="text-gray-700">Done: {completed}</Text>
      <Text className="text-gray-700">Pending: {pending}</Text>
    </View>
  );
}