<<<<<<< Updated upstream
import React from 'react';
import {useState,useEffect} from 'react'; 
import { StyleSheet, Text, View, TouchableOpacity,Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
const getData = async (setting:string) => {
  try{
const jsonValue = await AsyncStorage.getItem(setting);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  }catch(err){
    console.log(err);
  };
}
const storeData = async(setting:string, value:any) => {
try{
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem(setting, jsonValue);
}catch(err){


}
}


function SettingWidget(){
  return (
    <View style={styles.titleContainer}>
     
        <Text style={styles.titleText}>Settings</Text>
      
    </View>
  );
}
function SliderWidget({setting}: {setting: string}) {
  let savedData;
useEffect(()=>{
savedData = (getData(setting)==null?100:getData(setting));
storeData(setting, savedData);
},[]);

const [range, useRange]=useState(savedData||100);

return(
  <View style={styles.container}>
    <Text style={{color:'white',fontSize:20}}>{setting}</Text>
    <Text style={{color:'white',fontSize:20}}>{range}</Text>
    <Slider
    style={{width:200,height:40,padding:10}}
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




function SwitchWidget({setting}: {setting: string}) {
  let savedData;
    useEffect(() => {
      savedData = getData(setting)==null?false:getData(setting);
      // if(!savedData){
        savedData= false;
        storeData(setting, savedData);
      // }
  }, []);
 
  const [isEnabled, setIsEnabled] = useState(savedData||false);
  //just in case it returns null
  function toggleSwitch() {
    storeData(setting, !isEnabled);
    setIsEnabled(!isEnabled);
  }

  return (
    <View style={styles.container}>
    <Text style={{color:'white',fontSize:20}}>{setting}</Text>
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
        colors={['#707071','black']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.box} 
        />
      <SettingWidget />
      <SliderWidget setting="Pain"/>
      <SwitchWidget setting="Dark Mode"/>
      </View>
  );
=======
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Switch, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

const storeData = async (setting: string, value: any) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(setting, jsonValue);
    } catch (e) {
        console.log(e);
    }
};
const getData = async (setting: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(setting);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e);
    }
};

function SettingWidget() {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Settings</Text>
        </View>
    );
}

interface SliderWidgetProps {
    setting: string;
    defaultValue: number;
}

function SliderWidget({ setting, defaultValue }: SliderWidgetProps) {
    const [value, setValue] = useState<number>(defaultValue);

    useEffect(() => {
        const fetchData = async () => {
            const savedValue = await getData(setting);
            if (savedValue !== null) {
                setValue(savedValue);
            } else {
                await storeData(setting, defaultValue);
            }
        };
        fetchData();
    }, [setting, defaultValue]);

    const handleValueChange = (newValue: number) => {
        setValue(newValue);
        storeData(setting, newValue);
    };

    return (
        <View style={styles.sliderContainer}>
            <View style={styles.sliderLabelContainer}>
                <Text style={styles.sliderLabel}>{setting}</Text>
                <Text style={styles.sliderValue}>{value}</Text>
            </View>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                thumbTintColor="#FFFFFF"
                value={value}
                onValueChange={handleValueChange}
            />
        </View>
    );
>>>>>>> Stashed changes
}

interface SwitchWidgetProps {
    setting: string;
    defaultValue: boolean;
}

function SwitchWidget({ setting, defaultValue }: SwitchWidgetProps) {
    const [isEnabled, setIsEnabled] = useState<boolean>(defaultValue);

    useEffect(() => {
        const fetchData = async () => {
            const savedValue = await getData(setting);
            if (savedValue !== null) {
                setIsEnabled(savedValue);
            } else {
                await storeData(setting, defaultValue);
            }
        };
        fetchData();
    }, [setting, defaultValue]);

    const toggleSwitch = () => {
        const newValue = !isEnabled;
        setIsEnabled(newValue);
        storeData(setting, newValue);
    };

    return (
        <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>{setting}</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={styles.switch}
            />
        </View>
    );
}



const styles = StyleSheet.create({
<<<<<<< Updated upstream
  container: {
    flex: 1,
    width:'100%',
    borderRadius: 10,
    // justifyContent: 'center',
    height:50,
    // backgroundColor:'red',
    alignItems: 'center',
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
    alignItems: 'center',
    // backgroundColor: '#2e303d',
    borderRadius: 10,
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  titleText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
  },
  touchable: {
    // Ensure touchable opacity fills gradient
    flex: 1,
    justifyContent: 'center',
  },
=======
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#232931',
    },
    titleContainer: {
        marginBottom: 20,
        alignItems: 'flex-start',
    },
    titleText: {
        color: '#fff',
        fontSize: 50,
    },
    section: {
        backgroundColor: '#2e303d',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        color: 'white',
        fontSize: 20,
        paddingLeft: 30,
        fontWeight: 'bold',
        borderBottomWidth: 2,
        borderColor: '#2e303d',
        fontFamily: "Poppins_500Medium",
    },
    sliderContainer: {
        marginTop: 20,
    },
    sliderLabelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
    },
    sliderLabel: {
        color: 'darkgrey',
        fontSize: 20,
    },
    sliderValue: {
        color: 'white',
        fontSize: 20,
    },
    slider: {
        width: 200,
        height: 40,
        alignSelf: 'flex-end',
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        marginTop: 20,
    },
    switchLabel: {
        color: 'darkgrey',
        fontSize: 20,
    },
    switch: {
        alignSelf: 'flex-end',
    },
    scrollView: {
        backgroundColor: '#232931',
    },
>>>>>>> Stashed changes
});

export default function App() {
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
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <SettingWidget />
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>General</Text>
                    <SwitchWidget setting="Power" defaultValue={true} />
                    <SliderWidget setting="Pain" defaultValue={100} />
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Other</Text>
                    <SliderWidget setting="Volume" defaultValue={50} />
                    <SwitchWidget setting="Dark Mode" defaultValue={true} />
                </View>
            </View>
        </ScrollView>
    );
}