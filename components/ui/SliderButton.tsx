import {
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from "react-native";
import React from "react";
import Animated, {
  AnimatedRef,
  SharedValue,
  interpolateColor,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import arrowIcon from "@/assets/images/ArrowIcon.png";
import { router } from "expo-router";
import i18n from "@/i18n";
import { useTheme } from "@/context/ThemeContext";
import { SlideItem } from "@/components/ui/OnBoardingSliderItem";

type SliderButtonProps = {
  dataLength: number;
  flatListIndex: SharedValue<number>;
  flatListRef: AnimatedRef<FlatList<SlideItem>>; 
  x: SharedValue<number>;
};

const SliderButton = ({ flatListRef, flatListIndex, dataLength, x }: SliderButtonProps) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const { colors } = useTheme();

  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      width:
        flatListIndex.value === dataLength - 1
          ? withSpring(140)
          : withSpring(60),
      height: 60,
    };
  });

  const arrowAnimationStyle = useAnimatedStyle(() => {
    return {
      width: 30,
      height: 30,
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(-100)
              : withTiming(0),
        },
        { scaleX: -1 },
      ],
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(0)
              : withTiming(100),
        },
      ],
    };
  });

  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      [
        colors.buttonBackground,
        colors.tint,
        colors.buttonBackground,
      ]
    );

    return {
      backgroundColor: backgroundColor,
    };
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (flatListIndex.value < dataLength - 1) {
          flatListRef.current?.scrollToIndex({
            index: flatListIndex.value + 1,
          });
        } else {
          router.push("/SignIn");
        }
      }}
    >
      <Animated.View
        style={[styles.container, buttonAnimationStyle, animatedColor]}
      >
        <Animated.Text style={[styles.textButton, textAnimationStyle]}>
          {i18n.t("start")}
        </Animated.Text>
        <Animated.Image
          source={arrowIcon}
          style={[styles.arrow, arrowAnimationStyle]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default SliderButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 10,
  },
  arrow: {
    position: "absolute",
  },
  textButton: {
    color: "white",
    fontSize: 16,
    position: "absolute",
    fontWeight: "600",
  },
});
