import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from "react-native";
import React from "react";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import UpcomingSliderItem from "../ui/UpcomingSliderItem";
import Pagination from "../ui/Pagination";
import { upcomingSliderData } from "@/constants/data";
import { useTheme } from "@/context/ThemeContext";
import i18n from "@/i18n";

type ItemProps = {
  id: number;
  title: string;
  desc: string;
  img: any;
};

const UpcomingSlider = () => {
  const flatListRef = useAnimatedRef<FlatList<ItemProps>>();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);

  const { colors } = useTheme();

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      flatListIndex.value = viewableItems[0].index;
    }
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>
        {i18n.t("upcomingSchedule")}
      </Text>
      <View style={styles.sliderContainer}>
        <Animated.FlatList
          ref={flatListRef}
          data={upcomingSliderData}
          onScroll={onScroll}
          keyExtractor={(item) => `key:${item.id}`}
          renderItem={({ item }) => (
            <UpcomingSliderItem
              title={item.title}
              desc={item.desc}
              doctorImg={item.img}
            />
          )}
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
        <Pagination onbordingSliderData={upcomingSliderData} x={x} />
      </View>
    </View>
  );
};

export default UpcomingSlider;

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    overflow: "hidden",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    paddingHorizontal: 24,
  },
  sliderContainer: {
    maxHeight: 245,
  },
});
