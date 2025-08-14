import { Platform } from "react-native";
import { firebase } from "@react-native-firebase/app";
import messaging from "@react-native-firebase/messaging";
import auth from "@react-native-firebase/auth";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

// ✅ Firebase Configuration
const firebaseConfig = {
  apiKey: "AlzaSYb-Sp208SHLKrB5DXsgidX_9ziLtYYpnU",
  authDomain: "flowapp-e47ae.firebaseapp.com",
  projectId: "flowapp-e47ae",
  storageBucket: "flowapp-e47ae.appspot.com",
  messagingSenderId: "123253505121",
  appId: "1:123253505121:android:a62f4807e076c2d3e1fe20",
};

// ✅ Initialize Firebase only if not already initialized
try {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log("✅ Firebase Initialized Successfully");
  }
} catch (error) {
  console.error("❌ Firebase Initialization Failed:", error);
}

// ✅ Set Notification Handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// ✅ Function to Register for Push Notifications
export async function registerForPushNotificationsAsync() {
  console.log("🚀 Starting Push Notification Registration...");

  if (Platform.OS === "android") {
    console.log("✅ Setting up Android Notification Channel...");
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (!Device.isDevice) {
    console.warn("⚠️ Must use a physical device for push notifications.");
    return null;
  }

  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    console.log("🔍 Existing Permission Status:", existingStatus);

    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.error("❌ Push Notification Permission Denied!");
      return null;
    }

    console.log("✅ Push Notification Permission Granted!");

    // Get the Expo Push Token
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;

    if (!projectId) {
      console.error("❌ Project ID not found!");
      return null;
    }

    const { data: token } = await Notifications.getExpoPushTokenAsync({ projectId });
    console.log("✅ Expo Push Token:", token);

    return token;
  } catch (error) {
    console.error("❌ Error getting Expo Push Token:", error);
    return null;
  }
}

// ✅ Get FCM Token
export async function getFCMToken() {
  try {
    const token = await messaging().getToken();
    if (token) {
      console.log("✅ FCM Token:", token);
      return token;
    } else {
      console.warn("⚠️ No FCM Token Found.");
    }
  } catch (error) {
    console.error("❌ Error getting FCM Token:", error);
  }
}

// ✅ Handle Incoming Notifications
export function setupPushNotificationListeners() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log("🔔 Notification opened from background:", remoteMessage);
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log("🔔 Notification caused app to open from quit state:", remoteMessage);
      }
    });

  messaging().onMessage(async remoteMessage => {
    console.log("📩 New foreground message received:", remoteMessage);
    Notifications.scheduleNotificationAsync({
      content: {
        title: remoteMessage.notification?.title || "Notification",
        body: remoteMessage.notification?.body || "You have a new message",
      },
      trigger: null,
    });
  });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log("📩 Background Notification Received:", remoteMessage);
  });
}

// ✅ Firebase Authentication Functions
export async function signIn(email, password) {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    console.log("✅ Signed in successfully:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("❌ Sign-in Error:", error.message);
    throw error;
  }
}

export async function signUp(email, password) {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    console.log("✅ Signed up successfully:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("❌ Sign-up Error:", error.message);
    throw error;
  }
}

export async function signOut() {
  try {
    await auth().signOut();
    console.log("✅ Signed out successfully");
  } catch (error) {
    console.error("❌ Sign-out Error:", error.message);
    throw error;
  }
}

// ✅ Export Firebase Modules
export { messaging, auth };
