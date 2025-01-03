import { StyleSheet, Image, Platform, View } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useHistory } from "@/HistoryContext";

export default function TabTwoScreen() {
  const { history } = useHistory();

  return (
    <ThemedView style={styles.container}>
      {history.map(({ item, weight, price }, index) => (
        <ThemedView key={index} style={styles.box}>
          <ThemedText>{item}</ThemedText>
          <ThemedText>{weight}</ThemedText>
          <ThemedText>{price.toLocaleString()}</ThemedText>
        </ThemedView>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    gap: 15,
    marginTop: 5,
    justifyContent: "center",
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "green",
  },
});
