import { StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useAuth } from "@/context/auth";

export default function TabTwoScreen() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    const res = await signOut();
    if (!res) {
      Alert.alert("Oops", "Something went wrong");
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Account</ThemedText>
      </ThemedView>
      <ThemedText>
        This is a technical demo of a Todo app built with React Native and
        Nodejs.
      </ThemedText>
      <TouchableOpacity style={styles.logout} onPress={handleSignOut}>
        <Text style={styles.logout_text}>Logout</Text>
      </TouchableOpacity>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  logout: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 5,
    width: "50%",
  },
  logout_text: {
    color: "#fff",
    textAlign: "center",
  },
});
