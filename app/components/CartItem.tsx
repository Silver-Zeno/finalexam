import { Image, Pressable, Text, View } from "react-native";

type CartItemProps = {
  item: any;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  return (
    <View className="bg-white w-[300px] p-4 mb-4 rounded-lg items-center">
      <Image
        source={item.image}
        style={{ width: 300, height: 300 }}
        resizeMode="contain"
      />

      <Text className="font-semibold mt-2">{item.name}</Text>

      <Text className="text-green-600">₱{item.price}</Text>

      <View className="flex-row items-center mt-3">
        <Pressable
          onPress={onDecrease}
          className="bg-gray-300 px-4 py-2 rounded-l"
        >
          <Text className="text-lg font-bold">-</Text>
        </Pressable>

        <View className="bg-gray-100 px-5 py-2">
          <Text className="font-bold">{item.qty ?? 1}</Text>
        </View>

        <Pressable
          onPress={onIncrease}
          className="bg-gray-300 px-4 py-2 rounded-r"
        >
          <Text className="text-lg font-bold">+</Text>
        </Pressable>
      </View>

      <Text className="mt-3 text-lg font-bold text-blue-600">
        Subtotal: ₱{item.price * (item.qty ?? 1)}
      </Text>

      <Pressable onPress={onRemove} className="bg-red-500 p-2 mt-3 rounded">
        <Text className="text-white text-center">Remove</Text>
      </Pressable>
    </View>
  );
}
