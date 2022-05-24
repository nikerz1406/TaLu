import React,{ useState,useEffect } from 'react';
import { View,Text,StyleSheet,TouchableOpacity , ToastAndroid  } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axiosClient  from '../utilities/initToken';
import QRCode from 'react-native-qrcode-svg';

let logoFromFile = require('../assets/icon.png');

var svg = null;

const printSVG = (dataURL)=> {
  console.log(dataURL);

}
const setSVG = (value)=>{
  svg = value;
}
const onPress = () => {
  
  console.log(svg.toDataURL(printSVG));
};
export const Refrige = (props) => {
  
  const [token, setToken] = useState();
  
  useEffect(()=>{
    
    axiosClient.get('BabyName/initToken').then(function (response) {
      console.log({response});
      // handle success
      response.token && setToken(response.token)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })

 
    return ()=>{
      console.log("end get token")
    };
  },[])
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.print}>
          <TouchableOpacity onPress={onPress}>
              <MaterialCommunityIcons name="printer" size={30}/>
          </TouchableOpacity>
        </View>  
      </View>
      <View style={styles.body}>
      <TouchableOpacity onPress={ onPress }>
        <QRCode
            value={token}
            size={200}
            logo={logoFromFile}
            getRef= { setSVG }
          />
      </TouchableOpacity>
      </View>
      <View style={styles.bot}>
        <Text>Docs 1</Text>
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