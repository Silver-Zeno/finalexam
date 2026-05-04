import { View, TextInput, TouchableOpacity, Text } from "react-native";

export default function TaskInput({ input, setInput, onAdd }) {
  return (
    <View className="flex-row mb-4">
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Enter task..."
        className="flex-1 border p-2 rounded bg-white"
      />
      <TouchableOpacity
        onPress={onAdd}
        className="ml-2 bg-blue-500 px-4 justify-center rounded"
      >
        <Text className="text-white">Add</Text>
      </TouchableOpacity>
    </View>
  );
}