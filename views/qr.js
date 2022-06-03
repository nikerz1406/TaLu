import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button ,TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { MaterialCommunityIcons,Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import  { qrReducers } from '../redux/Reducers/qrSlice';

const openScan = (dispatch)=>{
  
  // setIsRegisted(null);
  dispatch(qrReducers({type:"WAITTING_QR"}))

}
export const Qr = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const qr = useSelector((state) => state.qr);
  const isRegisted = useSelector((state) => state.qr.registed);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

  },[]);

  const reloadPermission = async ()=>{
    const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      // do something
      dispatch(qrReducers({type:"OUT_SCREEN"}))
      
    });

    return unsubscribe;
  }, [navigation]);

  const handleBarCodeScanned = ({ type, data }) => {

    dispatch(qrReducers({type:'ADD_QR',value:data}))

    if(qr.registed) navigation.navigate('Foods');  
  
  };

  if (hasPermission === null) {
    return(
      <View style={styles.camera}>
        <Text>Requesting for camera permission</Text>
        <TouchableOpacity  onPress ={reloadPermission} style={{marginTop:10}} ><Text style={[styles.button,styles.open_scan]}>Open Permission</Text></TouchableOpacity>
      </View>
    );
  }
  
  if (hasPermission === false) {
    return (<View style={styles.camera} >
        <Text>No access to camera</Text>
        <TouchableOpacity  onPress ={reloadPermission} style={{marginTop:10}} ><Text style={[styles.button,styles.open_scan]}>Open Permission</Text></TouchableOpacity>
      </View>);
  }

  return (
    <View style ={ styles.container } >
      <View style ={ styles.camera } >
        { qr.scanning == false ? <View style ={ styles.qrcode } >
          <TouchableOpacity  onPress ={ () => openScan(dispatch)} >
            <MaterialCommunityIcons style ={ {marginTop:40}} name="qrcode-scan" size ={ 200 } />
          </TouchableOpacity>
          </View> :
        <BarCodeScanner  onBarCodeScanned ={ qr.scanned ? undefined : handleBarCodeScanned} style ={ styles.qrcode } /> 
        }
        { qr.scanning == true && <View style ={ {marginTop:10}} ><Text style ={ styles.scanning } >Scanning...</Text></View> }
      </View>
      <View style ={ styles.body } >
        <LabelRefrigerator name ={  qr.value } state ={  isRegisted } />        
      </View>  
      <View style ={ styles.bot } >
        { qr.scanning == false && 
          <View>
          <TouchableOpacity onPress ={ () => openScan(dispatch)} >
            <Text style={[styles.button,styles.open_scan]}>Open Scan</Text>
          </TouchableOpacity>
        </View>
        }
      </View>    
    </View>
  );
}

const LabelRefrigerator = (props) => {
  const color = props.state === false ? "red" : props.state === true ? "green" : "#212121";
  const icon = props.state === false ? "cancel" : props.state === true ? "check-circle" : "sync";
  return(
    <View>
      <Text style ={ styles.Refrigerator } >
          <MaterialCommunityIcons name ={  icon } color ={  color } size ={ 15}/>  Refrigerator - 
        <Text style ={ {color:color,fontWeight:"bold"} } > {props.name}</Text>
      </Text> 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor:"red",
    width:"100%",
    // marginBottom:40
  },
  Refrigerator:{
    marginBottom:50,
    marginTop:60,
  },
  scanning:{
    backgroundColor:"#F4511E",
    color:"white",
    textAlign: 'center',
  },
  camera:{
    flex:7,
  },
  qrcode:{
    flex: 3,
    // backgroundColor:"#5c6773",
    alignContent:"center",
    alignItems:"center",
  },
  body:{
    flex:3,
    // alignContent:"center",
    alignItems:"center",
    // marginVertical:20,
    // textAlign: 'center', 
    justifyContent:"flex-start",
    backgroundColor:"#CFD8DC"
  },
  bot:{
    flex:2,
    backgroundColor:"#CFD8DC",
    width:"100%",
    alignItems:"center",
  },
  button:{
    width:"100%",
    paddingVertical:9,
    paddingHorizontal:20,
    borderRadius:3,
    borderWidth:1,
    textAlign:"center"
  },
  open_scan:{
    backgroundColor:"white",
  },
});
