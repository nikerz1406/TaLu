import React,{ useEffect, useState,useMemo } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text,TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';


const clickFilter = (dispatch,setColorFilterType,flatListRef,type)=>{
  dispatch({type:"FILTER_TYPE"});
  dispatch({type:"SORT_TYPE",filterType:type});
  var color = type == 0 ? "#EF5350" : type == 1 ? "#FDD835" : "#66BB6A";
  setColorFilterType(color);
  flatListRef.scrollToOffset({ animated: true, offset: 0 });
}
const clickName = (dispatch,setColorFilterName,name)=>{
  
  dispatch({type:"FILTER_NAME"});
  var icon = name ? 'arrow-down' : 'arrow-up';
  setColorFilterName(icon);
  dispatch({type:"SORT_NAME",filterName:name});
}
const clickDate = ()=>{
  console.log("click date")
}

const onEnd = (dispatch) => {
  var id = Math.random().toString(36).substr(2)+Math.random().toString(36).substr(2); 
  var today  = new Date();
  var type = Math.floor(Math.random() * 3);
  var item = {
    id,date:today.toLocaleDateString(),time:today.toLocaleTimeString(),type,
    name:id
  }

  // // var new_data = [...listFoods,item];
  dispatch({
    type:"GET_FOODS",payload:item
  });

  console.log("end scroll")

}

export const Lists = () => {
  const [isFetching, setIsFetching] = useState(false);
  const listFoods = useSelector((state) => state.foods);
  const filterFoods = useSelector((state) => state.filterFoods);
  var flatListRef = null;
  const [colorFilterName,setColorFilterName] = useState('md-search-outline');
  const [colorFilterType,setColorFilterType] = useState('black');
  const dispatch = useDispatch();
  
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
          <TouchableOpacity onPress={ ()=>clickFilter(dispatch,setColorFilterType,flatListRef,filterFoods.type) }>
           <MaterialCommunityIcons name="filter" size={25} color={colorFilterType}/>
          </TouchableOpacity>
        </View>
        <View style={styles.name}>
          <TouchableOpacity onPress={() => clickName(dispatch,setColorFilterName,filterFoods.name) } style={{width:"30%"}}>
            <Text>Name <Ionicons name={colorFilterName} /></Text>
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
        renderItem={({item}) =>renderItem({item,dispatch})}
        ref={(ref) => { flatListRef = ref; }}
        keyExtractor={item => item.id}
        onEndReachedThreshold={0.5}
        onEndReached={()=>onEnd(dispatch)}
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
    backgroundColor: '#FCE4EC',
    flexDirection:"row",
    marginBottom: 8,
    paddingVertical:20,
    marginHorizontal: 8,
    borderRadius:4,
  },
  fitler:{ 
    flex:1,
    justifyContent: 'center'
  },
  name:{ flex:6,marginLeft:15 },
  plus:{ flex:3,flexDirection:"row" },
  date_body:{
    flex:2,
    marginRight:10
  }
});


const Empty = () =>(
  <View style={{ width:"100%",paddingHorizontal:20,alignItems:"center"}}><Text>No Found Data</Text></View>
)

const renderItem = ({ item,dispatch }) => {

  const color = item.type == 0 ? "#EF5350" : item.type == 1 ? "#FDD835" : "#66BB6A";
  // const dispatch = useDispatch();
  const clickRemove = ()=>{

    dispatch({type:"REMOVE_FOOD",id:item.id})
    console.log("remove");
  }
  return(
    <View style={styles.item}>
    <View style={styles.fitler}>
      <TouchableOpacity onPress={ clickRemove } style={{ marginLeft:10 }}>
        <Ionicons name="remove-circle" size={32} color={color} />
      </TouchableOpacity>  
    </View>
    <View style={styles.name}><Text>{item.name}</Text></View>
    <View style={styles.date_body}><Text>{item.date}</Text><Text>{item.time}</Text></View>
  </View>
  )
};     
