import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { products } from "./data/products";

export default function HomeScreen() {
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const saved = await AsyncStorage.getItem("cart");
    if (saved) {
      setCart(JSON.parse(saved));
    }
  };

  useEffect(() => {
    AsyncStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: (item.qty || 1) + 1 } : item,
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  if (showCart) {
    return (
      <ScrollView className="flex-1 p-4 bg-gray-100 ">
        <Text className="text-2xl font-bold mb-4">Cart</Text>

        <Pressable onPress={() => setShowCart(false)}>
          <Text className="text-blue-500 mb-4">← Back to Products</Text>
        </Pressable>

        {cart.length === 0 ? (
          <Text>No items in cart</Text>
        ) : (
          cart.map((item, index) => (
            <View
              key={index}
              className="bg-white w-[300px] p-4 mb-4 rounded-lg items-center "
            >
              <Image
                source={item.image}
                style={{ width: 300, height: 300 }}
                resizeMode="contain"
              />

              <Text className="font-semibold mt-2">{item.name}</Text>

              <Text className="text-green-600">₱{item.price}</Text>

              <Text className="mt-2 font-bold">Qty: {item.qty}</Text>

              <Pressable
                onPress={() => {
                  setCart((prev) => prev.filter((i) => i.id !== item.id));
                }}
                className="bg-red-500 p-2 mt-3 rounded"
              >
                <Text className="text-white text-center">Remove</Text>
              </Pressable>
            </View>
          ))
        )}
      </ScrollView>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4 ">
      <Text className="text-2xl font-bold mb-4">Products</Text>

      <Pressable onPress={() => setShowCart(true)}>
        <Text className="text-blue-500 mb-4">Go to Cart ({cart.length})</Text>
      </Pressable>

      {products.map((item) => (
        <View
          key={item.id}
          className="bg-white w-[400px] rounded-2xl p-4 mb-4 shadow items-center"
        >
          <Image
            source={item.image}
            style={{ width: 300, height: 300 }}
            resizeMode="contain"
          />

          <Text className="text-lg font-semibold mt-2">{item.name}</Text>

          <Text className="text-green-600 font-bold">₱{item.price}</Text>

          <Pressable
            onPress={() => addToCart(item)}
            className="bg-black p-2 mt-3 rounded"
          >
            <Text className="text-white text-center">Add to Cart</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
}
