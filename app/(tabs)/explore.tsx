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
}

const styles = StyleSheet.create({
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
});
