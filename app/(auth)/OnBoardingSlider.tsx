import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewToken,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import OnBoardingSliderItem, { SlideItem } from "@/components/ui/OnBoardingSliderItem";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from "react-native-reanimated";
import Pagination from "@/components/ui/Pagination";
import SliderButton from "@/components/ui/SliderButton";
import { router } from "expo-router";
import i18n from "@/i18n";
import { useTheme } from "@/context/ThemeContext";

export type APIResponse = {
  slides: SlideItem[];
  images: string[];
};

const { width } = Dimensions.get("window");

const OnBoardingSlider = () => {
  const flatListRef = useAnimatedRef<FlatList<SlideItem>>();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);
  const [sliderData, setSliderData] = useState<SlideItem[]>([]);
  const [backgroundImages, setBackgroundImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { colors } = useTheme();

  const translateY1 = useSharedValue(0);
  const translateY2 = useSharedValue(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://crm.comarkit.com/api/flow/onBoardingSliderItemsJSON");
        const json: APIResponse[] = await response.json();
        if (json.length > 0) {
          const data = json[0];
          setSliderData(data.slides);
          setBackgroundImages(data.images);
        }
      } catch (error) {
        console.error("Error fetching slider data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    translateY1.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 3000, easing: Easing.linear }),
        withTiming(10, { duration: 3000, easing: Easing.linear })
      ),
      -1,
      true
    );

    translateY2.value = withRepeat(
      withSequence(
        withTiming(10, { duration: 4000, easing: Easing.linear }),
        withTiming(-10, { duration: 4000, easing: Easing.linear })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle1 = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY1.value }],
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY2.value }],
  }));

  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index != null) {
      flatListIndex.value = viewableItems[0].index;
    }
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.animatedBackground}>
        <View style={styles.imagesRow}>
          <View style={styles.imagesColumn}>
            {backgroundImages[0] && (
              <Animated.Image source={{ uri: backgroundImages[0] }} style={[styles.image, animatedStyle1]} resizeMode="cover"/>
            )}
            {backgroundImages[1] && (
              <Animated.Image source={{ uri: backgroundImages[1] }} style={[styles.image, animatedStyle2]} resizeMode="cover"/>
            )}
            {backgroundImages[2] && (
              <Animated.Image source={{ uri: backgroundImages[2] }} style={[styles.image, animatedStyle1]} resizeMode="cover"/>
            )}
          </View>
          <View style={styles.imagesColumn}>
            {backgroundImages[3] && (
              <Animated.Image source={{ uri: backgroundImages[3] }} style={[styles.image, animatedStyle2]} resizeMode="cover"/>
            )}
            {backgroundImages[4] && (
              <Animated.Image source={{ uri: backgroundImages[4] }} style={[styles.image, animatedStyle1]} resizeMode="cover"/>
            )}
            {backgroundImages[5] && (
              <Animated.Image source={{ uri: backgroundImages[5] }} style={[styles.image, animatedStyle2]} resizeMode="cover"/>
            )}
          </View>
        </View>
      </View>

      <View style={styles.sliderContainer}>
        <View style={[styles.contentContainer, { backgroundColor: colors.card }]}>
          <Animated.FlatList
            ref={flatListRef}
            data={sliderData}
            onScroll={onScroll}
            keyExtractor={(item) => `key:${item.id}`}
            renderItem={({ item, index }) => <OnBoardingSliderItem item={item} idx={index} />}
            scrollEventThrottle={16}
            horizontal
            bounces={false}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{
              minimumViewTime: 300,
              viewAreaCoveragePercentThreshold: 10,
            }}
          />

          <View style={styles.paginationWrapper}>
            <Pagination onbordingSliderData={sliderData} x={x} />
          </View>

          <View style={styles.bottomButtons}>
            <Pressable onPress={() => router.replace("/SignIn")}>
              <Text style={{ color: colors.text, fontWeight: "600", fontSize: 16, }}>{i18n.t("skip")}</Text>
            </Pressable>
            <SliderButton
              flatListRef={flatListRef}
              flatListIndex={flatListIndex}
              dataLength={sliderData.length}
              x={x}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default OnBoardingSlider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animatedBackground: {
    position: "absolute",
    paddingTop: 32,
    width: "100%",
  },
  imagesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  imagesColumn: {
    gap: 16,
  },
  image: {
    height: 150,
    width: 160,
    borderRadius: 20,
  },
  sliderContainer: {
    justifyContent: "flex-end",
    flex: 1,
  },
  contentContainer: {
    maxHeight: 300,
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  paginationWrapper: {
    paddingVertical: 10,
    marginBottom:10,
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
