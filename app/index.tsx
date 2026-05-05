import { View, Text } from "react-native";
import { useTasks } from "../hooks/useTasks";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import StatsPanel from "./components/StatsPanel";
import ActionButtons from "./components/ActionButtons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    markAllComplete,
    deleteCompleted,
  } = useTasks();

  const completed = tasks.filter((t) => t.completed).length;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-4 pt-4 pb-2">
        <View className="mb-4">
          <Text className="text-3xl font-bold text-black">To-Do App</Text>
        </View>

        <TaskInput onAdd={addTask} />
        <View className="mt-3">
          <StatsPanel total={tasks.length} completed={completed} />
        </View>
        <View className="mt-3 mb-3">
          <ActionButtons onMarkAll={markAllComplete} onClearDone={deleteCompleted} />
        </View>

        <View className="flex-1">
          {tasks.length === 0 ? (
            <View className="flex-1 items-center justify-center">
              <Text className="text-base text-gray-500">No tasks yet.</Text>
            </View>
          ) : (
            <TaskList
              tasks={tasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}