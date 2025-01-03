import { Tabs } from "expo-router";
import React, { useState } from "react";
import { Platform, useWindowDimensions } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import Foundation from "@expo/vector-icons/Foundation";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const windowDimensions = useWindowDimensions();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarLabelStyle: {
          fontSize: windowDimensions.width > 500 ? 30 : 25,
        },
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          android: { height: windowDimensions.width > 500 ? 120 : 60 },
          default: {},
        }),
        tabBarLabelPosition: "below-icon",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Calculator",
          tabBarIcon: ({ color }) => (
            <AntDesign
              name="calculator"
              size={windowDimensions.width > 500 ? 35 : 28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => (
            <Foundation
              name="clipboard-notes"
              size={windowDimensions.width > 500 ? 35 : 28}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
