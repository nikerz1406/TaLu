import React,{ useEffect } from 'react';
import { View,Text,StyleSheet,TouchableOpacity  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import { useSelector, useDispatch } from 'react-redux';
import { getToken,refrigetatorReducers } from '../redux/Reducers/refrigetatorSlice';
import { MaterialCommunityIcons } from '@expo/vector-icons';

let logoFromFile = require('../assets/icon.png');
var svg = null;
const saveImg = (dataURL)=>{

  
}
// const setSVG = (value)=>{
//   svg = value;
// }
const onPress = (dispatch) => {
  console.log("print");

  svg.toDataURL((dataURL)=>{
    dispatch(refrigetatorReducers({type:'SAVE',value:dataURL}))
    saveImg(dataURL);
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
            getRef= {(value)=> { svg = value }}
          /> }
      </TouchableOpacity>
      </View>
      <View style={styles.bot}>
        <View>
          <Text>Bước 1 : In Qr ở trên dán lên tủ lạnh (chụp màn hình)</Text>
          <Text>Bước 2 : Bấm vào biểu tượng <MaterialCommunityIcons name="line-scan" color="#424242" size={15} /> scan để quét mã</Text>
          <Text style={{fontWeight:"bold"}}>Màn hình : </Text>
          <Text>      <Text style={styles.color_module}><MaterialCommunityIcons name="format-list-bulleted" color="#424242" size={15} /> Foods</Text> - Danh sách thực phẩm</Text>
          <Text>      <Text style={styles.color_module}><MaterialCommunityIcons name="basket-plus-outline" color="#424242" size={15} /> Plus</Text> - Thêm thực phẩm</Text>
          <Text>      <Text style={styles.color_module}><MaterialCommunityIcons name="line-scan" color="#424242" size={15} /> Scan</Text> - Quét mã QR tủ lạnh</Text>
          <Text>      <Text style={styles.color_module}><MaterialCommunityIcons name="texture-box" color="#424242" size={15} /> Refrigerator</Text> - Dán nhãn QR cho tủ lạnh</Text>
          <Text style={{fontWeight:"bold"}}>Chú thích:</Text>
          <Text>- QR ở trên sẽ luôn tạo mới và không bao  </Text>
          <Text>trùng nhau, quét đúng Qr đã dán trên tủ lạnh.</Text>
        </View>
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
    marginLeft:15,
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
  color_module:{
    fontWeight:"bold",
    color:"green"
  }
})