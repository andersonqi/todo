import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import Checkbox from "expo-checkbox";
import { Feather } from "@expo/vector-icons";
import api from "@/config/api";
import { useAuth } from "@/context/auth";
import { TodoList } from "@/types/todo";

const TodoScreen = () => {
  const { user } = useAuth();
  const [task, setTask] = React.useState("");
  const [refreshing, setRefreshing] = React.useState(false);
  const [todos, setTodos] = React.useState<TodoList[]>([]);

  React.useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await api.get(`/todos/users/${user.uuid}`);
      setTodos(response.data);
    } catch (error) {
      console.log("error fetching todos", error);
    }
  };

  const addTodo = async () => {
    if (!task) {
      Alert.alert("Error", "Task name is required");
      return;
    }

    try {
      const response = await api.post("/todos", {
        name: task,
        user_uuid: user.uuid,
      });

      if (response.data.status === "ok") {
        fetchTodos();
        setTask("");
      }
    } catch (error) {
      console.log("error adding todo", error);
    }
  };

  const handleUpdateStatus = async (uuid: string, completed: boolean) => {
    try {
      const response = await api.put("/todos", {
        uuid,
        completed: completed,
      });

      if (response.data.status === "ok") {
        fetchTodos();
      }
    } catch (error) {
      console.log("error updating todo", error);
    }
  };

  const handleDelete = async (uuid: string) => {
    if (Platform.OS === "web") {
      const response = await api.delete(`/todos/${uuid}`);
      if (response.data.status === "ok") {
        fetchTodos();
      }
    }

    try {
      Alert.alert("Delete", "Are you sure you want to delete this task?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            const response = await api.delete(`/todos/${uuid}`);
            if (response.data.status === "ok") {
              fetchTodos();
            }
          },
        },
      ]);
    } catch (error) {
      console.log("error deleting todo", error);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchTodos();
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.actions}>
        <TextInput
          style={styles.input}
          placeholder="New task"
          onChangeText={(text) => setTask(text)}
          value={task}
        />
        <TouchableOpacity style={styles.actions_add} onPress={addTodo}>
          <Text style={styles.action_add_text}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        <FlatList
          data={todos}
          keyExtractor={(item) => item.uuid}
          refreshing={refreshing}
          onRefresh={onRefresh}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text
                style={{
                  textDecorationLine: item.completed ? "line-through" : "none",
                  fontSize: 16,
                }}
              >
                {item.name}
              </Text>
              <View style={styles.actions_item}>
                <Checkbox
                  value={item.completed}
                  onValueChange={() =>
                    handleUpdateStatus(item.uuid, !item.completed)
                  }
                  style={{ width: 25, height: 25 }}
                />
                <TouchableOpacity onPress={() => handleDelete(item.uuid)}>
                  <Feather name="trash" size={25} color="#d21a1a" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: "#ddd" }} />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    width: "75%",
  },
  actions_add: {
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
    width: "20%",
  },
  action_add_text: {
    color: "#fff",
    textAlign: "center",
  },
  list: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  actions_item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  item: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default TodoScreen;
