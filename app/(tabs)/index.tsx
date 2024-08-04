<<<<<<< Updated upstream
import { View, ScrollView, Text, Image, StyleSheet, Platform } from "react-native";
=======
// import BleManager from "react-native-ble-manager";

// import { request, PERMISSIONS } from "react-native-permissions";

// const requestBluetoothPermission = async () => {


//     console.log("requesting permissions");
//     console.log(PERMISSIONS)
//     const permission = await request(PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL);
//     console.log("permission", permission);
// };




// requestBluetoothPermission();

// function Stats({ title, icon }: { title: String; icon: Image }) {
//     return (
//         <View>
//             <ThemedText type="title">{title}</ThemedText>
//         </View>
//     );
// }

// export default function HomeScreen() {
//     useEffect(() => {
//         requestBluetoothPermission();
//     }, []);

//     return (
//         <ParallaxScrollView
//             headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
//             headerImage={
//                 <Image
//                     source={require("@/assets/images/partial-react-logo.png")}
//                     style={styles.reactLogo}
//                 />
//             }
//         >
//             <ThemedView style={styles.titleContainer}>
//                 <ThemedText type="title">Car Buddy </ThemedText>
//                 <HelloWave />
//             </ThemedView>
//             <ThemedView style={styles.stepContainer}>
//                 <ThemedText type="subtitle">Step 1: ur mom</ThemedText>
//                 <ThemedText>
//                     Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see
//                     changes. Press{" "}
//                     <ThemedText type="defaultSemiBold">
//                         {Platform.select({ ios: "cmd + d", android: "cmd + m" })}
//                     </ThemedText>{" "}
//                     to open developer tools.
//                 </ThemedText>
//             </ThemedView>
//             <ThemedView style={styles.stepContainer}>
//                 <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//                 <ThemedText>
//                     Tap the Explore tab to learn more about what's included in this starter app.
//                 </ThemedText>
//             </ThemedView>
//             <ThemedView style={styles.stepContainer}>
//                 <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//                 <ThemedText>
//                     When you're ready, run{" "}
//                     <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a
//                     fresh <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will
//                     move the current <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
//                     <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//                 </ThemedText>
//             </ThemedView>
//         </ParallaxScrollView>
//     );
// }


import { View, ScrollView, Text, Image, StyleSheet, Platform, Button } from "react-native";
import { useEffect, useContext, useState } from "react";
>>>>>>> Stashed changes

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { DataCtx } from "@/components/Context"

import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

// import TargetSvg from "../../components/Target";
// import StatsSvg from "../../components/Stats";
// import WaveSvg from "../../components/Wave";
// import DefaultPfp from "../../components/DefaultPfp";

import RNBluetoothClassic from 'react-native-bluetooth-classic';
import { PermissionsAndroid } from "react-native";

// import { VictoryChart, VictoryLine } from "victory-native"
import { CartesianChart, Line } from "victory-native"

// import Sound from 'react-native-sound';

export default function HomeScreen() {
    const dataCtx = useContext(DataCtx)

    const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(false)

    /**
     * to use after getting data from bluetooth
     */
    function processData(data: string) {
        const split = (dataCtx.buffer + data).split(";")
        if (!split[split.length - 1].endsWith(";")) {
            dataCtx.setBuffer(split.pop() || "")
        }
        split.forEach(x => dataCtx.addData(x))


        //play punishment sound
        const playSound = () => {
            const sound = new Sound("../../assets/sounds/scream1.mp3", Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    console.log("Couldnt load sound", error)
                    return;
                }
                sound.play((success) => {
                    if (!success) {
                        console.log('Playback failed due to audio decoding errors');
                    }
                });
            })
        }
    }



    useEffect(() => {
        const connectToBluetooth = async () => {

            // const requestAccessFineLocationPermission = async () => {
            //     const granted = await PermissionsAndroid.request(
            //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            //       {
            //         title: 'Access fine location required for discovery',
            //         message:
            //           'In order to perform discovery, you must enable/allow ' +
            //           'fine location access.',
            //         buttonNeutral: 'Ask Me Later',
            //         buttonNegative: 'Cancel',
            //         buttonPositive: 'OK',
            //       }
            //     );
            //     return granted === PermissionsAndroid.RESULTS.GRANTED;
            //   };

            // requestAccessFineLocationPermission();

            RNBluetoothClassic.onBluetoothEnabled(async (event) => {
                setIsBluetoothEnabled(true)

                console.log('bluetooth enabled')
                const unpairedDevices = await RNBluetoothClassic.startDiscovery();
                const hc05 = unpairedDevices.find((device) => device.address === "98-d3-51-fe-dc-d7");
                await hc05?.connect();
                console.log('connected');
                hc05?.onDataReceived((message) => {
                    console.log(message.data)
                    processData(message.data)
                });
            });
            RNBluetoothClassic.onBluetoothDisabled((event) => setIsBluetoothEnabled(false));





        }

        connectToBluetooth();
    }, []);


    //loading fonts
    const [loaded, error] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
<<<<<<< Updated upstream
        <ScrollView style={styles.homeBg}>
            <ThemedView style={styles.welcomeMsg}>
                <ThemedText>Welcome Back, User </ThemedText>
            </ThemedView>
            <ThemedView>
                <ThemedText>Step 1: ur mom</ThemedText>
            </ThemedView>
=======
        <ScrollView style={styles.homeContainer}>
            <View style={styles.welcomeMsgContainer}>
                <Text style={[styles.heading, styles.welcomeMsg]}>Welcome Back, User </Text>
                {/* <DefaultPfp width={50} height={50} style={styles.defaultPfp}></DefaultPfp> */}
            </View>
            <Text style={[styles.text, styles.homeTitle]}>Overview</Text>
            <View style={styles.focusContainer}>
                <View style={styles.focusContainerTitle}>
                    {/* <TargetSvg width={28} height={28} style={styles.target}></TargetSvg> */}
                    <Text style={[styles.heading]}>Focus</Text>
                    <View style={styles.additionBubble}>
                        <Text style={styles.additionText}>+5%</Text>
                    </View>
                </View>
                <View style={styles.separator}></View>
            </View>
            <View style={styles.statsContainer}>
                <View style={styles.statsContainerTitle}>
                    {/* <StatsSvg width={28} height={28} style={styles.target}></StatsSvg> */}
                    <Text style={[styles.heading]}>Stats</Text>
                </View>
                <View style={styles.separator}></View>
                <View style={styles.waveContainer}>
                    {/* <WaveSvg width={20} height={20} style={styles.target}></WaveSvg> */}
                    <View>
                        <Text style={[styles.text]}>Gamma Waves</Text>
                        <Text style={styles.infoText}>15</Text>
                    </View>
                </View>
                <View style={styles.waveContainer}>
                    {/* <WaveSvg width={20} height={20} style={styles.target}></WaveSvg> */}
                    <View>
                        <Text style={[styles.text]}>Alpha Waves</Text>
                        <Text style={styles.infoText}>21</Text>
                    </View>
                </View>
                <View style={styles.waveContainer}>
                    {/* <WaveSvg width={20} height={20} style={styles.target}></WaveSvg> */}
                    <View>
                        <Text style={[styles.text]}>Beta Waves</Text>
                        <Text style={styles.infoText}>13</Text>
                    </View>
                </View>
                <CartesianChart data={dataCtx.data} xKey="timestamp" yKeys={["value", "freq"]}>
                    {({ points }) => (
                        //👇 pass a PointsArray to the Line component, as well as options.
                        <Line
                            points={points.value}
                            color="red"
                            strokeWidth={3}
                            animate={{ type: "timing", duration: 300 }}
                        />
                    )}
                </CartesianChart>
            </View>
            <Text style={styles.infoText}>SOME INFO ABOUT DIFFERENT TYPES OF WAVES AND WHAT THEY MEAN</Text>
>>>>>>> Stashed changes
        </ScrollView>
    );
}

const styles = StyleSheet.create({
<<<<<<< Updated upstream
    homeBg: {
        backgroundColor: "#161616",
        height: 4000,
        color: "#FFFFFF",
    },
    welcomeMsg: {
        margin: 8,
        backgroundColor: "rgba(0, 0, 0, 0)",
=======
    homeContainer: {
        backgroundColor: "#141619",
        padding: 32,
    },
    text: {
        color: "#FFFFFF",
        fontSize: 12,
        fontFamily: "Poppins_500Medium"
    },
    heading: {
        fontFamily: "Poppins_500Medium",
        color: "#FFFFFF",
        fontSize: 16,
    },
    welcomeMsgContainer: {
        flex: 0,
        flexDirection: "row",
        alignItems: "center",
        marginTop: "auto",
    },
    welcomeMsg: {
        marginTop: 16,
        marginBottom: 32,
    },
    homeTitle: {
        fontSize: 32,
        fontFamily: "Poppins_600SemiBold",
        marginBottom: 16,
        marginTop: "auto",
>>>>>>> Stashed changes
    },
    focusContainer: {
        backgroundColor: "#1d2025",
        height: 228,
        width: "100%",
        borderRadius: 15,
        padding: 16,
        marginBottom: 16,
    },
    statsContainer: {
        backgroundColor: "#1d2025",
        height: 228,
        width: "100%",
        borderRadius: 15,
        padding: 16,
        marginBottom: 16,
    },
    focusContainerTitle: {
        flex: 0,
        flexDirection: "row",
        alignItems: "center",
        height: 28,
        marginTop: 16,
    },
    statsContainerTitle: {
        flex: 0,
        flexDirection: "row",
        alignItems: "center",
        height: 28,
        marginTop: 16,
    },
    target: {
        marginRight: 12,
    },
    stats: {
        marginRight: 12,
    },
    defaultPfp: {
        marginLeft: "auto",
    },
    additionBubble: {
        marginLeft: "auto",
        borderRadius: 10,
        height: 28,
        padding: 4,
        backgroundColor: "rgba(43, 238, 124, 0.2)",
    },
    additionText: {
        color: "rgba(43, 238, 124, 1)",
    },
    separator: {
        height: 2,
        width: "100%",
        backgroundColor: "#343942",
        marginTop: 28,
        marginBottom: 16,
    },
    waveContainer: {
        flex: 0,
        flexDirection: "row",
        marginBottom: 48,
    },
    infoText: {
        fontSize: 12,
        color: "#878b92",
        fontFamily: "Poppins_500Medium"
    }
});