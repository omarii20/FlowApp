import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderWithBackButtonAfterLogin from "@/components/ui/HeaderWithBackButtonAfterLogin";
import FormField from "@/components/FormField";
import LinkButton from "@/components/LinkButton";

const ChangePassword = () => {
  return (
      <ScrollView>
        <View className="p-6">
          <HeaderWithBackButtonAfterLogin isPushBack={true} title="Change Password" />
          <View className="pt-8">
            <View>
              <FormField placeholder="******" name="Old Password" />
            </View>
            <View className="pt-5">
              <FormField placeholder="******" name="New Password" />
            </View>
            <View className="pt-5 pb-8">
              <FormField placeholder="******" name="Confirm Password" />
            </View>

            <LinkButton link="/ProfileTab" text="Save" />
          </View>
        </View>
      </ScrollView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
