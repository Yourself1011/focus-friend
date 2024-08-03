import { View, ScrollView, Text, Image, StyleSheet, Platform } from "react-native";

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
        <ScrollView style={styles.homeBg}>
            <ThemedView style={styles.welcomeMsg}>
                <ThemedText>Welcome Back, User </ThemedText>
                <HelloWave />
            </ThemedView>
            <ThemedView>
                <ThemedText>Step 1: ur mom</ThemedText>
            </ThemedView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    homeBg: {
        backgroundColor: "#161616",
        height: 4000,
        color: "#FFFFFF",
    },
    welcomeMsg: {
        margin: 8,
        backgroundColor: "rgba(0, 0, 0, 0)",
    },
});
