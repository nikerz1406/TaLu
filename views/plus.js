import React,{ useState } from 'react';
import { TouchableOpacity,SafeAreaView,View,Text,StyleSheet,TextInput,Keyboard  } from 'react-native';

const clickMark = (checkMark,id) =>{
  switch (id) {
    case 0:
      checkMark({meat:true})
      break;
    case 1:
      checkMark({vegetable:true})
      break;
    default:
      checkMark({starch:true})
      break;
  }
}

export const Plus = () => {
  const [text, setText] = useState('');
  const [meat, setMeat] = useState(true);
  const [starch, setStarch] = useState(false);
  const [vegetable, setVegetable] = useState(false);
  const [isCommit,setIsCommit] = useState(false);

  const clickCancel = () =>{
    setText(null);
    checkMark({meat:true});
    // Hide that keyboard!
    Keyboard.dismiss()
  }
  const clickOK = () =>{
    clickCancel()
    setIsCommit(true);

    const type = meat == true ? 0 : vegetable == true ? 1 : 2;

    console.log(isCommit,text,type);
    // setTimeout(()=>{
    //   setIsCommit(false);
    // },1000)
  }
  const checkMark = function({
    meat = false,
    starch = false,
    vegetable = false
  }){
    setMeat(meat)
    setStarch(starch)
    setVegetable(vegetable)
  }
  
  return (
    <SafeAreaView style={styles.container} >
      <View style={styles.container_type} >
        <TouchableOpacity onPress={()=>clickMark(checkMark,0)} >
          <View style={styles.item} >
            { meat ? <View style={[{backgroundColor:"#EF5350"},styles.circle,styles.active]} ></View> : <View style={[{backgroundColor:"#EF5350"},styles.circle]} ></View>}
            { meat ?  <Text style={styles.text_active}> Meat </Text> : <Text> Meat </Text> }
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>clickMark(checkMark,2)} >
          <View style={styles.item}>
            { starch ? <View style={[{backgroundColor:"#FDD835"},styles.circle,styles.active]} ></View> : <View style={[{backgroundColor:"#FDD835"},styles.circle]} ></View> } 
            { starch ? <Text style={styles.text_active} > Starch </Text> : <Text> Starch </Text> }
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>clickMark(checkMark,1)} >
          <View style={styles.item}>
            { vegetable ? <View style={[{backgroundColor:"#66BB6A"},styles.circle,styles.active]} ></View> : <View style={[{backgroundColor:"#66BB6A"},styles.circle]} ></View> }
            { vegetable ? <Text style={styles.text_active} > Vegetable </Text> : <Text> Vegetable </Text> }
          </View>
        </TouchableOpacity>
        
      </View>
      <View style={styles.container_alert}>
         { isCommit ?? <Text style={styles.alert} >text</Text> }
      </View>
      <View style={styles.container_input}>
        
        <TextInput
          style={styles.input_text}
          placeholder="Type here to translate!"
          onChangeText={newText => setText(newText)}
          defaultValue={text}
        />
      </View>
      <View style={styles.container_button} >
        <View style={styles.button_item} >
          <TouchableOpacity onPress={clickCancel} >
            <Text style={[styles.button,styles.cancel]}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button_item} >
          <TouchableOpacity onPress={clickOK}>
            <Text style={styles.button}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
      </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column",
    width:"100%"
  },
  container_type:{
    flexDirection:"row",
    justifyContent: 'space-evenly',
    flex:2,
  },
  container_alert:{
    height:30
  },
  container_input:{
    flex:3,
  },
  container_button:{
    flex:2,
    flexDirection:"row",
    width:"80%",
    marginHorizontal:40
  },
  circle:{
    width:40,
    height:40,
    borderRadius:50,
    marginTop:20,
    marginBottom:5
  },
  item:{
    alignItems:"center"
  },
  active:{
    borderColor:"#424242",
    borderWidth:3
  },
  input_text:{
    padding:30,
    borderColor:"#424242",
    height:"100%",
    borderWidth:3,
    borderRadius:4,
    marginHorizontal:60,
  },
  button_item:{
    flex:1,
    marginTop:55,
    marginHorizontal:20
  },
  cancel:{
    backgroundColor:"#EFEBE9",
    borderColor:"#757575",
    color:"#757575"
  },
  ok:{
    
  },
  alert:{
    backgroundColor:"#F4511E",
    textAlign: 'center',
    color:"white",
    marginBottom:4,
    paddingVertical:2
  },
  button:{
    width:"100%",
    padding:9,
    borderRadius:3,
    borderWidth:1,
    textAlign:"center"
  },
  text_active:{
    color:"#424242",
    fontWeight:"bold"
  }
})
