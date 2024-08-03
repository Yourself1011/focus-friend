import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Switch, StyleSheet, Image, Platform, Text } from "react-native";
import { useState } from "react";
import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { LinearGradient } from "expo-linear-gradient";
import Slider from "@react-native-community/slider";
function SettingWidget() {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Settings</Text>
        </View>
    );
}
function SliderWidget({ setting }: { setting: string }) {
    const [range, useRange] = useState(50);
    return (
        <View style={styles.containerSettings}>
            <Text style={{ color: "white", fontSize: 20 }}>{setting}</Text>
            <Text style={{ color: "white", fontSize: 20 }}>{range}</Text>
            <Slider
                style={{ width: 200, height: 40, padding: 10 }}
                minimumValue={0}
                maximumValue={100}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                thumbTintColor="#FFFFFF"
                value={range}
                onValueChange={useRange}
            />
        </View>
    );
}
function SwitchWidget({ setting }: { setting: string }) {
    const [isEnabled, setIsEnabled] = useState(false);
    function toggleSwitch() {
        setIsEnabled(!isEnabled);
    }

    return (
        <View style={styles.containerSettings}>
            <Text style={{ color: "white", fontSize: 20 }}>{setting}</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    );
}
export default function App() {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={["#707071", "black"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.box}
            />
            <SettingWidget />
            <SliderWidget setting="Pain" />
            <SliderWidget setting="Audio" />
            <SwitchWidget setting="Dark Mode" />
        </View>
    );
}
const styles = StyleSheet.create({
    containerSettings: {
        flex: 1,

        // justifyContent: 'center',
        alignItems: "center",
        width: "100%",
        height: "50%",
        backgroundColor: "gray",
    },
    headerImage: {
        color: "#808080",
        bottom: -90,
        left: -35,
        position: "absolute",
    },
    // titleContainer: {
    //     flexDirection: "row",
    //     gap: 8,
    // },
    container: {
        flex: 1,

        // justifyContent: 'center',
        alignItems: "center",
        // Optionally, add padding or margins here
    },
    box: {
        ...StyleSheet.absoluteFillObject,
        // Or use flex to cover the whole screen
        //  flex: 1,
    },
    titleContainer: {
        margin: 20,
        // position: 'absolute',
        alignItems: "center",
        // backgroundColor: '#2e303d',
        borderRadius: 10,
    },
    button: {
        paddingVertical: 20,
        paddingHorizontal: 40,
    },
    titleText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 24,
    },
    touchable: {
        // Ensure touchable opacity fills gradient
        flex: 1,
        justifyContent: "center",
    },
});
