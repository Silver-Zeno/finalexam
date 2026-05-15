import { Image, Pressable, Text, View } from "react-native";

type ProductCardProps = {
  item: any;
  onAddToCart: () => void;
};

export default function ProductCard({ item, onAddToCart }: ProductCardProps) {
  return (
    <View className="bg-white w-[400px] rounded-2xl p-4 mb-4 shadow items-center">
      <Image
        source={item.image}
        style={{ width: 300, height: 300 }}
        resizeMode="contain"
      />

      <Text className="text-lg font-semibold mt-2">{item.name}</Text>

      <Text className="text-green-600 font-bold">₱{item.price}</Text>

      <Pressable onPress={onAddToCart} className="bg-black p-2 mt-3 rounded">
        <Text className="text-white text-center">Add to Cart</Text>
      </Pressable>
    </View>
  );
}
