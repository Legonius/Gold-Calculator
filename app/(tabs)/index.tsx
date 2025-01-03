import {
  StyleSheet,
  TextInput,
  SafeAreaView,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useHistory } from "@/HistoryContext";

export default function HomeScreen() {
  const colorTheme = useThemeColor({ light: "black", dark: "white" }, "text");
  const [goldPrice, setGoldPrice] = useState<any>("");
  const [yway, setYway] = useState<any>("");
  const [ayawtTwat, setAyawtTwat] = useState<any>("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState({
    goldPriceError: "",
    goldWeightError: "",
  });

  const { addHistoryItem } = useHistory();

  const handlePress = () => {
    let hasError = false;
    Keyboard.dismiss();
    if (goldPrice.length === 0 || goldPrice === "") {
      setError((prev) => ({ ...prev, goldPriceError: "Enter Gold Price" }));
      hasError = true;
      return hasError;
    } else {
      setError((prev) => ({ ...prev, goldPriceError: "" }));
    }
    if (
      goldPrice.length < 7 ||
      isNaN(Number(goldPrice)) ||
      goldPrice.length > 7
    ) {
      setError((prev) => ({ ...prev, goldPriceError: "Invalid Gold Price" }));
      hasError = true;
      return hasError;
    } else {
      setError((prev) => ({ ...prev, goldPriceError: "" }));
    }

    if (!yway) {
      setError((prev) => ({ ...prev, goldWeightError: "Enter Gold Weight" }));
      hasError = true;
      return hasError;
    } else {
      setError((prev) => ({ ...prev, goldWeightError: "" }));
    }
    const goldWeight = Number(yway);
    const goldPerYway = Number(goldPrice) / 128;

    const totalGoldPrice = goldWeight * goldPerYway;
    setTotalPrice(Math.floor(totalGoldPrice + Number(ayawtTwat)));
    addHistoryItem({
      item: "default",
      weight: goldWeight,
      price: Math.floor(totalGoldPrice + Number(ayawtTwat)),
    });
    return hasError;
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{
        flex: 1,
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView
          style={{
            flex: 1,
            paddingVertical: 35,
          }}
        >
          <StatusBar hidden />
          <View style={styles.container}>
            <ThemedView style={styles.titleContainer}>
              <Text style={[styles.title, { color: "orange" }]}>
                TMD Gold Calculator
              </Text>

              <MaterialCommunityIcons
                name="gold"
                size={Dimensions.get("window").width > 500 ? 45 : 35}
                color="orange"
                accessibilityLabel="Gold Icon"
                accessible={true}
              />
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
              <ThemedText type="subtitle">ရွှေစျေး</ThemedText>
              <TextInput
                style={[
                  styles.inputText,
                  {
                    color: colorTheme,
                    borderColor: error.goldPriceError ? "red" : colorTheme,
                  },
                ]}
                keyboardType="numeric"
                value={goldPrice}
                onChange={(e) => setGoldPrice(e.nativeEvent.text)}
              />
            </ThemedView>
            {error.goldPriceError && (
              <Text style={styles.errorText}>{error.goldPriceError}</Text>
            )}
            <ThemedView style={styles.stepContainer}>
              <ThemedText type="subtitle">လက်ခ</ThemedText>
              <TextInput
                style={[
                  styles.inputText,
                  {
                    color: colorTheme,
                    borderColor: colorTheme,
                  },
                ]}
                keyboardType="numeric"
                value={ayawtTwat}
                onChange={(e) => setAyawtTwat(e.nativeEvent.text)}
              />
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
              <ThemedText type="subtitle">ရွေး</ThemedText>
              <TextInput
                style={[
                  styles.inputText,
                  {
                    color: colorTheme,
                    borderColor: error.goldWeightError ? "red" : colorTheme,
                  },
                ]}
                keyboardType="numeric"
                value={yway}
                onChange={(e) => setYway(e.nativeEvent.text)}
              />
            </ThemedView>
            {error.goldWeightError && (
              <Text style={styles.errorText}>{error.goldWeightError}</Text>
            )}

            <ThemedView style={styles.stepContainer1}>
              <ThemedText type="title">Grand Total</ThemedText>
              <Text style={[styles.total, { color: colorTheme }]}>
                {totalPrice.toLocaleString()}
              </Text>
            </ThemedView>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : undefined} // Use "padding" for iOS
              keyboardVerticalOffset={90} // Adjust this offset based on your layout
            >
              <TouchableOpacity activeOpacity={0.5} onPress={handlePress}>
                <Text style={[styles.button, { color: "white" }]}>
                  Calculate
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
const windowWindth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    gap: 15,
    marginTop: 5,
    justifyContent: "center",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    backgroundColor: "transparent",
  },
  stepContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
    marginBottom: 0,
    backgroundColor: "transparent",
  },
  stepContainer1: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    gap: 8,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "yellow",
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: windowWindth > 500 ? 42 : 30,
    fontWeight: 900,
  },
  inputText: {
    borderWidth: 2,
    padding: 10,
    fontSize: windowWindth > 500 ? 30 : 20,
    width: "80%",
  },
  total: {
    fontSize: windowWindth > 500 ? 50 : 30,
    fontWeight: 700,
  },
  errorText: {
    fontSize: windowWindth > 500 ? 30 : 22,
    color: "red",
    textAlign: "center",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: windowWindth > 500 ? 20 : 10,
    backgroundColor: "green",
    fontSize: windowWindth > 500 ? 30 : 20,
    textAlign: "center",
    fontWeight: windowWindth > 500 ? 900 : 700,
  },
});
