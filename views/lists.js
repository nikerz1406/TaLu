import React,{ useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text,TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';

const DATA = [
  {
    id:"1",
    date:'10/10/2022',
    time:'PM 9h30',
    type:1
  },
  {
    id:"2",
    date:'10/10/2022',
    time:'PM 9h30',
    type:2
  },
  {
    id:"3",
    date:'10/10/2022',
    time:'PM 9h30',
    type:0
  },
  {
    id:"4",
    date:'10/10/2022',
    time:'PM 9h30',
    type:1
  },
  {
    id:"5",
    date:'10/10/2022',
    time:'PM 9h30',
    type:1
  },
  {
    id:"6",
    date:'10/10/2022',
    time:'PM 9h30',
    type:2
  },
  {
    id:"7",
    date:'10/10/2022',
    time:'PM 9h30',
    type:0
  },
  {
    id:"8",
    date:'10/10/2022',
    time:'PM 9h30',
    type:1
  },
];


const clickFilter = ()=>{
  console.log("click filter")
}
const clickName = ()=>{
  console.log("click name")
}
const clickDate = ()=>{
  console.log("click date")
}
const clickRemove = (i)=>{
  console.log(i)
  console.log("click remove")
}

export const Lists = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [listFoods,setLisFoods ] =  useState(DATA);
  const [visible, setVisible] = useState(false);

  const renderItem = ({ item }) => (
    <Item item={item} />
  );
  

  const onEnd = (listFoods,setLisFoods) => {
    var id = Math.random().toString(36).substr(2)+Math.random().toString(36).substr(2); 
    var today  = new Date();
    var type = Math.floor(Math.random() * 3);
    var item = {
      id,date:today.toLocaleDateString(),time:today.toLocaleTimeString(),type
    }
  
    setLisFoods([...listFoods,item]);
  
    console.log("end scroll")
  
  }

  const fetchData = () => {
    // dispatch(getAllTopicAction(userParamData));
    setIsFetching(false);
  };
  
  const clickPlus = ()=>{
    console.log("click plus")
    setVisible(true)
  }

  const onRefresh = () => {
    setIsFetching(true);
    fetchData();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head_table}>
        <View style={styles.fitler}>
          <TouchableOpacity onPress={ clickFilter }>
           <MaterialCommunityIcons name="filter" size={25}/>
          </TouchableOpacity>
        </View>
        <View style={styles.name}>
          <TouchableOpacity onPress={ clickName } style={{width:"30%"}}>
            <Text>Name <MaterialIcons name="search"/></Text>
          </TouchableOpacity>
        </View>
        <View style={styles.plus}>
          <TouchableOpacity onPress={ clickDate } style={{ flex:2 }}>
            <MaterialCommunityIcons  name="text-search" size={25}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={ clickPlus } style={{ flex:1 }}>
            <MaterialCommunityIcons name="plus-circle-outline" size={25}/>
          </TouchableOpacity>
        </View>
      </View>
      
      <FlatList
        style={{ 
          // backgroundColor:"red",
          width:"100%"}}
        data={listFoods}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onEndReachedThreshold={0.5}
        onEndReached={onEnd}
        ListEmptyComponent={<Empty/>}
        progressViewOffset={100}
        onRefresh={onRefresh}
        refreshing={isFetching}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%"
  },
  modal:{
    backgroundColor: 'red', padding: 20,
    flex:1
  },
  head_table:{ flexDirection:"row",marginBottom:10,borderBottomColor:"#757575",borderBottomWidth:1,marginHorizontal:20,paddingBottom:10},
  item: {
    backgroundColor: '#BBDEFB',
    flexDirection:"row",
    marginBottom: 8,
    paddingVertical:20,
    marginHorizontal: 8,
    borderRadius:4,
  },
  fitler:{ flex:1 },
  name:{ flex:6,marginLeft:15 },
  plus:{ flex:3,flexDirection:"row" },
  date_body:{flex:2}
});

const Item = ({ item }) => {
  const color = item.type == 0 ? "red" : item.type == 1 ? "yellow" : "green";
  const id = item.id;
  return(
    <View style={styles.item}>
    <View style={styles.fitler}>
      <TouchableOpacity onPress={ ()=>clickRemove(id) } style={{ marginLeft:15 }}>
        <MaterialCommunityIcons name="circle" size={20} style={{ color:color }}/>
      </TouchableOpacity>  
    </View>
    <View style={styles.name}><Text>{item.id}</Text></View>
    <View style={styles.date_body}><Text>{item.date}</Text><Text>{item.time}</Text></View>
  </View>
  )
}
const Empty = () =>(
  <View style={{ width:"100%",paddingHorizontal:20,alignItems:"center"}}><Text>No Found Data</Text></View>
)
