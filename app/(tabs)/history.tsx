import {
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Text,
  StatusBar,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useHistory } from "@/HistoryContext";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

export default function TabTwoScreen() {
  const { history, clearHistory } = useHistory();
  const [selectedValue, setSelectedValue] = useState("");
  const handleItem = () => {};
  const handleColor = (types: number): string => {
    if (types === 16) return "green";
    if (types === 15) return "orange";
    return "red";
  };

  return (
    <ThemedView style={styles.container}>
      <StatusBar hidden={true} />
      <FlatList
        data={history}
        ListEmptyComponent={() => (
          <ThemedView>
            <ThemedText
              // type="title"
              style={{ textAlign: "center", marginVertical: 30 }}
            >
              History is Empty
            </ThemedText>
          </ThemedView>
        )}
        ListHeaderComponent={() => (
          <ThemedView style={styles.header}>
            <ThemedText style={styles.headertext}>No.</ThemedText>
            <ThemedText style={styles.headertext}>Items</ThemedText>
            <ThemedText style={styles.headertext}>Weight</ThemedText>
            <ThemedText style={styles.headertext}>Price</ThemedText>
          </ThemedView>
        )}
        renderItem={({ item, index }) => (
          <ThemedView
            key={index}
            style={[styles.box, { borderColor: handleColor(item.types) }]}
          >
            <ThemedText>{index + 1}</ThemedText>
            <Picker
              selectedValue={selectedValue}
              style={styles.picker}
              onValueChange={(itemValue) => handleItem()}
            >
              <Picker.Item label="လက်စွပ်" value="လက်စွပ်" />
              <Picker.Item label="ဆွဲကြိုး" value="ဆွဲကြိုး" />
              <Picker.Item label="နားကပ်" value="နားကပ်" />
              <Picker.Item label="လက်ကောက်" value="လက်ကောက်" />
            </Picker>
            <ThemedText>{item.weight}</ThemedText>
            <ThemedText type="subtitle">
              {item.price.toLocaleString()}
            </ThemedText>
          </ThemedView>
        )}
      />
      <TouchableOpacity
        onLongPress={() => clearHistory()}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Clear All</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}
const windowWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    gap: 15,
    paddingVertical: 15,
    justifyContent: "center",
  },
  flatContainer: {},
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 4,
    borderRadius: 10,
    marginVertical: 5,
  },

  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  headertext: {
    fontSize: windowWidth > 500 ? 25 : 20,
    fontWeight: 500,
  },
  button: {
    backgroundColor: "red",
    height: windowWidth > 500 ? 65 : 50,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: windowWidth > 500 ? 35 : 25,
  },
  picker: {
    height: "100%",
    width: 200,
  },
});
