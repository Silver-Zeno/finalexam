import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";
import ProductCard from "./components/ProductCard";
import { products } from "./data/products";

export default function HomeScreen() {
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const saved = await AsyncStorage.getItem("cart");

      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch (error) {
      console.log("Error loading cart:", error);
    }
  };

  useEffect(() => {
    AsyncStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + (item.qty ?? 1), 0);
  };

  const getGrandTotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * (item.qty ?? 1),
      0,
    );
  };

  const addToCart = (product: any) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                qty: (item.qty ?? 1) + 1,
              }
            : item,
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  const increaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: (item.qty ?? 1) + 1,
            }
          : item,
      ),
    );
  };

  const decreaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: Math.max((item.qty ?? 1) - 1, 1),
            }
          : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  if (showCart) {
    return (
      <ScrollView className="flex-1 bg-gray-100 p-4">
        <Text className="text-2xl font-bold mb-4">Cart</Text>

        <Pressable onPress={() => setShowCart(false)}>
          <Text className="text-blue-500 mb-4">← Back to Products</Text>
        </Pressable>

        {cart.length === 0 ? (
          <Text className="text-center mt-5">No items in cart</Text>
        ) : (
          <View className="items-center">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={() => increaseQty(item.id)}
                onDecrease={() => decreaseQty(item.id)}
                onRemove={() => removeItem(item.id)}
              />
            ))}

            <CartSummary
              totalItems={getTotalItems()}
              grandTotal={getGrandTotal()}
            />
          </View>
        )}
      </ScrollView>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold mb-4">Products</Text>

      <Pressable onPress={() => setShowCart(true)}>
        <Text className="text-blue-500 mb-4">
          Go to Cart ({getTotalItems()})
        </Text>
      </Pressable>

      <View className="items-center">
        {products.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            onAddToCart={() => addToCart(item)}
          />
        ))}
      </View>
    </ScrollView>
  );
}
