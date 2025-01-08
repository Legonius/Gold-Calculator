import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";

export function HapticTab(props: BottomTabBarButtonProps) {
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/sounds/tab-switch.wav") // Path to your sound file
    );
    await sound.playAsync();
  }
  return (
    <PlatformPressable
      {...props}
      onPress={() => playSound()}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === "ios") {
          // Add a soft haptic feedback when pressing down on the tabs.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
    />
  );
}
