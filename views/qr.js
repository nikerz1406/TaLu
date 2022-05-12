import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button ,TouchableOpacity,TextInput} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

export const Qr = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  const refrigerator = useSelector((state) => state.refrigetator);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

  },[]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      // do something
      setScanned(true);
      
    });

    return unsubscribe;
  }, [navigation]);

  const handleBarCodeScanned = ({ type, data }) => {

    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    dispatch({type:'ADD_DATA',value:data})
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.camera}>
        { scanned ? <View style={styles.qrcode} >
          <TouchableOpacity onPress={() => setScanned(false)} >
            <MaterialCommunityIcons style={{marginTop:40}} name="qrcode-scan" size={200} />
          </TouchableOpacity>
          </View> :
        <BarCodeScanner  onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={styles.qrcode} /> 
        }
        { scanned == false && <View style={{marginTop:10}} ><Text style={styles.scanning}>Scanning...</Text></View> }
      </View>
      <View style={styles.body}>
        <Text style={styles.Refrigerator} ><MaterialCommunityIcons name="texture-box"/> Refrigerator - <Text style={{color:"#F4511E",fontWeight:"bold"}}>{refrigerator}</Text></Text>          
      </View>  
      <View style={styles.bot}>
        { scanned == true && <Button title={'Open Scan'} onPress={() => setScanned(false)}/> }
      </View>    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    // backgroundColor:"red",
    width:"100%",
    // marginBottom:40
  },
  Refrigerator:{
    marginBottom:50,
    marginTop:60
  },
  scanning:{
    backgroundColor:"#F4511E",
    color:"white",
    textAlign: 'center', 
  },
  camera:{
    flex:7
  },
  qrcode:{
    flex: 3,
    width:"100%",
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
  }
});