import { FlatList, View } from "react-native";
import useTasks from "../hooks/useTasks";

import TaskInput from "./components/TaskInput";
import StatsPanel from "./components/StatsPanel";
import ActionButtons from "./components/ActionButtons";
import TaskItem from "./components/TaskItem";
import EmptyState from "./components/EmptyState";

// ✅ Type for FlatList
type Task = {
  id: string;
  text: string;
  completed: boolean;
};

export default function HomeScreen() {
  const {
    tasks,
    input,
    setInput,
    addTask,
    toggleTask,
    deleteTask,
    markAllComplete,
    deleteCompleted,
    total,
    completed,
    pending,
  } = useTasks();

  return (
    <View className="flex-1 bg-gray-100 p-4">
      
      <TaskInput input={input} setInput={setInput} onAdd={addTask} />

      <StatsPanel total={total} completed={completed} pending={pending} />

      <ActionButtons
        onMarkAll={markAllComplete}
        onDeleteCompleted={deleteCompleted}
      />

      {tasks.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList<Task>
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              item={item}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          )}
        />
      )}
    </View>
  );
}