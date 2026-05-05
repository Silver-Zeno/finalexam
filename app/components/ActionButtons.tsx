import { View, Pressable, Text } from "react-native";

export default function ActionButtons({
  onMarkAll,
  onClearDone,
}: {
  onMarkAll: () => void;
  onClearDone: () => void;
}) {
  return (
    <View className="flex-row gap-3">
      <Pressable
        onPress={onMarkAll}
        className="flex-1 items-center rounded-md border border-gray-300 py-2 active:opacity-80"
      >
        <Text className="text-black">Mark all done</Text>
      </Pressable>
      <Pressable
        onPress={onClearDone}
        className="flex-1 items-center rounded-md border border-gray-300 py-2 active:opacity-80"
      >
        <Text className="text-black">Clear done</Text>
      </Pressable>
    </View>
  );
}