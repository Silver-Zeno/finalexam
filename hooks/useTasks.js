import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { loadTasksFromStorage, saveTasksToStorage } from "../services/storage";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [tasks]);

  const loadTasks = async () => {
    const data = await loadTasksFromStorage();
    setTasks(data);
  };

  const saveTasks = async () => {
    await saveTasksToStorage(tasks);
  };

  const addTask = () => {
    if (!input.trim()) {
      Alert.alert("Error", "Task cannot be empty");
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      text: input,
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setInput("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = (id) => {
    Alert.alert("Delete Task", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: () => setTasks(tasks.filter(t => t.id !== id))
      }
    ]);
  };

  const markAllComplete = () => {
    setTasks(tasks.map(t => ({ ...t, completed: true })));
  };

  const deleteCompleted = () => {
    setTasks(tasks.filter(t => !t.completed));
  };

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  return {
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
  };
}