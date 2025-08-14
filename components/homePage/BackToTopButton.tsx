import React from 'react';
import { Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from "@/context/ThemeContext";

type BackToTopButtonProps = {
  fadeAnim: Animated.AnimatedInterpolation<number> | Animated.Value;
  onPress: () => void;
};

const BackToTopButton: React.FC<BackToTopButtonProps> = ({ fadeAnim, onPress }) => {
  const { colors } = useTheme();

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.background, shadowColor: colors.text }]}
        onPress={onPress}
      >
        <AntDesign name="upcircle" size={40} color={colors.tint} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default BackToTopButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    zIndex: 100,
  },
  button: {
    borderRadius: 25,
    padding: 5,
    elevation: 5, // Shadow for Android
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
  },
});
