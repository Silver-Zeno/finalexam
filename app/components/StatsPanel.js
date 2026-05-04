import { View, Text } from "react-native";

export default function StatsPanel({ total, completed, pending }) {
  return (
    <View className="mb-4 p-3 bg-white rounded">
      <Text>Total: {total}</Text>
      <Text>Completed: {completed}</Text>
      <Text>Pending: {pending}</Text>
    </View>
  );
}