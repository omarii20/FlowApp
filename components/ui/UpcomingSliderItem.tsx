import {
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import arrow from "@/assets/images/arrow.png";
import sliderImgBg from "@/assets/images/doctor_img_bg.png";
import { useTheme } from "@/context/ThemeContext";

type Props = { title: string; desc: string; doctorImg: any };

const UpcomingSliderItem = ({ title, desc, doctorImg }: Props) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          width: SCREEN_WIDTH * 0.9,
          margin: SCREEN_WIDTH * 0.05,
          backgroundColor: colors.card,
        },
      ]}
    >
      <View style={styles.row}>
        <View style={styles.textWrapper}>
          <Text style={[styles.title, { color: colors.text }]}>
            {title} <Image source={arrow} style={styles.arrowIcon} />
          </Text>
          <Text style={[styles.desc, { color: colors.text }]}>
            {desc}
          </Text>
        </View>
        <View style={styles.imageWrapper}>
          <Image source={doctorImg} style={styles.doctorImg} resizeMode="contain" />
          <View style={styles.bgWrapper}>
            <Image
              source={sliderImgBg}
              style={styles.bgImg}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default UpcomingSliderItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    marginTop: 28,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  textWrapper: {
    maxWidth: 230,
    paddingLeft: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  desc: {
    fontSize: 12,
    paddingTop: 8,
  },
  arrowIcon: {
    width: 16,
    height: 16,
  },
  imageWrapper: {
    position: "relative",
    marginTop: -40,
  },
  doctorImg: {
    zIndex: 10,
    width: 90,
    height: 90,
  },
  bgWrapper: {
    position: "absolute",
    top: 10,
    bottom: 0,
    right: 0,
    overflow: "hidden",
  },
  bgImg: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    height: "100%",
  },
});
