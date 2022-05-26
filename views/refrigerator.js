import React,{ useState,useEffect } from 'react';
import { View,Text,StyleSheet,TouchableOpacity , ToastAndroid  } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import { useSelector, useDispatch } from 'react-redux';
import { getToken,refrigetatorReducers } from '../redux/Reducers/refrigetatorSlice';

let logoFromFile = require('../assets/icon.png');

var svg = null;

const printSVG = (dataURL)=> {
  // console.log(dataURL);
  return dataURL;
}
const setSVG = (value)=>{
  svg = value;
}
const onPress = (dispatch) => {
  console.log("print");
  svg.toDataURL((dataURL)=>{
    dispatch(refrigetatorReducers({type:'SAVE',value:dataURL}))
  });
 
  
};
export const Refrige = (props) => {

  const token = useSelector((state) => state.refrigetator.token);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if(token == null){
        dispatch(getToken());
      }
      
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.print}>
          <TouchableOpacity onPress={() =>onPress(dispatch)}>
              <MaterialCommunityIcons name="printer" size={30}/>
          </TouchableOpacity>
        </View>  
      </View>
      <View style={styles.body}>
      <TouchableOpacity onPress={() =>onPress(dispatch)}>
        { token && <QRCode
            value={token}
            size={200}
            logo={logoFromFile}
            getRef= { setSVG }
          /> }
      </TouchableOpacity>
      </View>
      <View style={styles.bot}>
        <Text>DOCS</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    width:"100%",flex:1
  },
  print:{ 
    // backgroundColor:"red",
    alignItems:"flex-end",
    paddingRight:50},
  top:{
    flex:1,
    // backgroundColor: "green",
    
  },
  body:{
    flex:7,
    // backgroundColor: "blue",
    alignItems: 'center',
    justifyContent: 'center',
  },
  bot:{
    flex:8,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth:1,
    borderTopColor:"gray"
    // backgroundColor: "yellow",
  },
   box: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
})