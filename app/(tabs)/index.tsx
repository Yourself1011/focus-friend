import { View, Text, Image, StyleSheet, Platform } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import BleManager from "react-native-ble-manager";
import { useEffect } from "react";

import { request, PERMISSIONS } from "react-native-permissions";
const requestBluetoothPermission = async () => {
    console.log("requesting permissions");
    const permission = await request(PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL);
    console.log("permission", permission);
};

useEffect(() => {
    requestBluetoothPermission();
});
const startDeviceScan = async () => {
    await BleManager.start();

    BleManager.scan([], 5, true)
        .then(() => {
            console.log("Scanning...");
        })
        .catch((error) => {
            console.error("Scan error:", error);
        });
};

requestBluetoothPermission();

function Stats({ title, icon }: { title: String; icon: Image }) {
    return (
        <View>
            <ThemedText type="title">{title}</ThemedText>
        </View>
    );
}

export default function HomeScreen() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
            headerImage={
                <Image
                    source={require("@/assets/images/partial-react-logo.png")}
                    style={styles.reactLogo}
                />
            }
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Car Buddy </ThemedText>
                <HelloWave />
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Step 1: ur mom</ThemedText>
                <ThemedText>
                    Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see
                    changes. Press{" "}
                    <ThemedText type="defaultSemiBold">
                        {Platform.select({ ios: "cmd + d", android: "cmd + m" })}
                    </ThemedText>{" "}
                    to open developer tools.
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Step 2: Explore</ThemedText>
                <ThemedText>
                    Tap the Explore tab to learn more about what's included in this starter app.
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
                <ThemedText>
                    When you're ready, run{" "}
                    <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a
                    fresh <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will
                    move the current <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
                    <ThemedText type="defaultSemiBold">app-example</ThemedText>.
                </ThemedText>
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: "absolute",
    },
});
