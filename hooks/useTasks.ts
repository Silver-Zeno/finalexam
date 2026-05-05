import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Platform } from "react-native";
import { Task } from "../types/Task";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const loadTasks = async () => {
    const data = await AsyncStorage.getItem("tasks");
    if (data) setTasks(JSON.parse(data));
  };

  const addTask = (title: string) => {
    if (!title.trim()) {
      Alert.alert("Error", "Task cannot be empty");
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    if (Platform.OS === "web") {
      const confirmed = globalThis.confirm("Delete this task?");
      if (confirmed) {
        setTasks((prev) => prev.filter((t) => t.id !== id));
      }
      return;
    }

    Alert.alert("Delete Task", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setTasks((prev) => prev.filter((t) => t.id !== id));
        },
      },
    ]);
  };

  const markAllComplete = () => {
    setTasks((prev) => prev.map((t) => ({ ...t, completed: true })));
  };

  const deleteCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    markAllComplete,
    deleteCompleted,
  };
};
