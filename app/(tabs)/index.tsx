import { StyleSheet, View, SafeAreaView } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/context/auth";
import TodoComponent from "@/components/todo";

export default function HomeScreen() {
  const { user } = useAuth();
  return (
    <SafeAreaView>
      <View style={styles.welcome}>
        <ThemedText type="title">Hi, {user.username}!</ThemedText>
        <HelloWave />
      </View>
      <TodoComponent />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  welcome: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});
