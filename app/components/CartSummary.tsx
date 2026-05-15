import { Text, View } from "react-native";

type CartSummaryProps = {
  totalItems: number;
  grandTotal: number;
};

export default function CartSummary({
  totalItems,
  grandTotal,
}: CartSummaryProps) {
  return (
    <View className="mt-5 p-4 bg-white rounded-lg w-[300px]">
      <Text className="text-lg font-bold mb-2">Total Items: {totalItems}</Text>

      <Text className="text-xl font-bold text-green-600">
        Grand Total: ₱{grandTotal}
      </Text>
    </View>
  );
}
