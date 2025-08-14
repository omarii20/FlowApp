import { StyleSheet, View, Text, Platform } from "react-native";
import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useI18n } from "@/hooks/use18n";
import { useTheme } from "@/context/ThemeContext"; 

const TabLayout = () => {
  const activeTab = useSharedValue(0); 
  const insets = useSafeAreaInsets();
  const baseHeight = 30; // גובה בסיס לטאב־בר
  const basePaddingBottom = 25;
  const { i18n, isRTL } = useI18n();
  const { colors } = useTheme(); 
  
  // רשימת המסכים
  const tabScreens = [
    {
      name: "Home",
      icon: <Feather name="home" size={24} color={colors.tabsIcon} />, 
      label: i18n.t("home"),
    },
    {
      name: "MyAppoinment",
      icon: <FontAwesome6 name="calendar-check" size={24} color={colors.tabsIcon} />,
      label: i18n.t("queues"),
    },
    {
      name: "ProfileTab",
      icon: <Feather name="user" size={24} color={colors.tabsIcon} />,
      label: i18n.t("profile"),
    },
  ];

  const finalScreens = isRTL ? [...tabScreens].reverse() : tabScreens ;

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: [
            styles.tabBar,
            {
              backgroundColor: colors.card,
              // הגובה כולל את ה-safe area למטה + קצת מרווח נעים
              height: baseHeight + insets.bottom + basePaddingBottom,
              // רווח "פנימי" כדי שהאייקונים יעלו ויהיו במרכז
              paddingTop: 1,
              paddingBottom: Math.max(insets.bottom, basePaddingBottom),
              justifyContent: 'center',
              alignItems: 'center' 
            },
          ],
        }}
      >
        {finalScreens.map((tab) => (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <AnimatedTabIcon
                  focused={focused}
                  icon={tab.icon}
                  label={tab.label}
                  colors={colors}
                />
              ),
            }}
          />
        ))}
      </Tabs>

    </View>
  );
};

const AnimatedTabIcon = ({
  focused,
  icon,
  label,
  colors,
}: {
  focused: boolean;
  icon: React.ReactNode;
  label: string;
  colors: any;
}) => {
  const scale = useSharedValue(focused ? 1.1 : 1);
  const opacity = useSharedValue(focused ? 1 : 0.6);

  useEffect(() => {
    scale.value = withSpring(focused ? 1.1 : 1, { damping: 10, stiffness: 100 });
    opacity.value = withTiming(focused ? 1 : 0.6, { duration: 300 });
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.iconContainer, animatedStyle]}>
      {icon}
      <Text
        style={[
          styles.tabLabel,
          { color: focused ? colors.tint : colors.tabIconDefault },
        ]}
      >
        {label}
      </Text>
    </Animated.View>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
  tabBar: {
    height: Platform.OS === "android" ? 55 : 65,
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: "#cbcbcb",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: -5 },
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "space-around",
    width: 70,
    height: 40,
    zIndex: 2,
  },
  tabLabel: {
    textAlign: "center",
    fontSize: 10,
    width: 70,
    fontWeight: "600",
  },
});
