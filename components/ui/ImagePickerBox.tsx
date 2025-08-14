import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useI18n } from "@/hooks/use18n";
import { useTheme } from "@/context/ThemeContext";

const ImagePickerBox = () => {
    const { colors } = useTheme();
    const { i18n } = useI18n();

    return (
        <View style={[styles.imagePicker, { backgroundColor: colors.card, shadowColor: colors.text }]}>
        <Feather name="camera" size={32} color={colors.camiraIcon} />
        <Text style={[styles.text, { color: colors.text }]}>{i18n.t("selectImage")}</Text>
        </View>
    );
};

export default ImagePickerBox;

const styles = StyleSheet.create({
imagePicker: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
},
text: {
    marginTop: 6,
    fontSize: 16,
},
});
