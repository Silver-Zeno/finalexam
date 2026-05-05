import { View, TextInput, Pressable, Text } from "react-native";
import { useState } from "react";

export default function TaskInput({ onAdd }: { onAdd: (text: string) => void }) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    const value = input.trim();
    if (!value) return;
    onAdd(value);
    setInput("");
  };

  return (
    <View className="flex-row gap-2">
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Enter a task..."
        placeholderTextColor="#9ca3af"
        className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-black"
      />
      <Pressable
        onPress={handleAdd}
        className="justify-center rounded-md bg-black px-4 active:opacity-80"
      >
        <Text className="text-white">Add</Text>
      </Pressable>
    </View>
  );
}