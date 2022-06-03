import React,{ useEffect, useState } from 'react';
import {  View, FlatList, StyleSheet, Text,TouchableOpacity,Alert  } from 'react-native';
import { MaterialCommunityIcons,Ionicons,FontAwesome } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { filterReducers } from '../redux/Reducers/filtersSlice';
import { foodsReducers,getFoods,removeFoods } from '../redux/Reducers/foodsSlice';
import { badgeReducers } from '../redux/Reducers/badgeSlice';
import { useNavigation } from '@react-navigation/native';
import { foodColors,foodColorsDark } from '../utilities/const';

const clickFilter = (dispatch,flatListRef,mode,filterIcon)=>{
  console.log("click filter")
  dispatch(filterReducers({type:"FILTER_TYPE"}));
  dispatch(foodsReducers({type:"SORT_TYPE",filterType:mode}));

  var color = mode == 0 ? foodColorsDark.red : mode == 1 ? foodColorsDark.green : foodColorsDark.yellow;
  filterIcon({type:color})

  flatListRef.scrollToOffset({ animated: true, offset: 0 });
}
const clickName = (dispatch,flatListRef,mode,filterIcon)=>{
  console.log("click filter name")

  dispatch(foodsReducers({type:"SORT_NAME",filterName:mode}));
  dispatch(filterReducers({type:"FILTER_NAME"}));

  var icon = mode ? 'arrow-down' : 'arrow-up';
  filterIcon({name:icon,active_name:true})

  flatListRef.scrollToOffset({ animated: true, offset: 0 });
}
const clickDate = (dispatch,mode,filterIcon)=>{
  console.log("click date")
  dispatch(filterReducers({type:"FILTER_DATE"}));
  dispatch(foodsReducers({type:"SORT_DATE",filterDate:mode}));

  var icon = mode ? 'calendar-text' : 'calendar-week';
  filterIcon({date:icon,active_date:true})

}

const onEnd = (dispatch,page,qr) => {

  // get data
  dispatch(getFoods({page,refrigera_id:qr}));

  console.log("end scroll")

}

export const FoodLists = () => {
  const [isFetching, setIsFetching] = useState(false);
  const status = useSelector((state) => state.foods.status);
  const listFoods = useSelector((state) => state.foods.data);
  const filterFoods = useSelector((state) => state.filterFoods);
  const page = useSelector((state) => state.foods.page);
  const [nameBorderColor,setNameBorderColor] = useState(foodColorsDark.default);
  const [dateBorderColor,setDateBorderColor] = useState(foodColorsDark.default);
  var flatListRef = null;
  const [iconFilterName,setIconFilterName] = useState('md-search-outline');
  const [colorFilterType,setColorFilterType] = useState(foodColorsDark.default);
  const [iconFilterDate,setIconFilterDate] = useState('text-search');
  const qr = useSelector((state) => state.qr.value);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  
  const filterIcon = function({ 
    // default value
    name = 'md-search-outline',
    type = foodColorsDark.default,
    active_name = false,
    date = 'text-search',
    active_date = false,
  }){
    setColorFilterType(type)
    setIconFilterName(name)
    setIconFilterDate(date)
    var color_active_name = active_name ? foodColorsDark.active : foodColorsDark.default
    setNameBorderColor(color_active_name)
    var color_active_date = active_date ? foodColorsDark.active : foodColorsDark.default
    setDateBorderColor(color_active_date)
  }
  
  useEffect(() => {
    
    if(listFoods.length == 0){
      // get data
      dispatch(getFoods({page:0,refrigera_id:qr}));
      console.log(listFoods)
    }
    
  },[])

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      // Prevent default behavior
      // e.preventDefault();

      // get data
      dispatch(getFoods({page}));

      // Do something manually
      dispatch(badgeReducers({type:"BADGE",module:'FOODS',command:'remove'}))

    });
  
    return unsubscribe;
  }, [navigation]);

  const onRefresh = () => {
    console.log("refresh")
    // get data
    dispatch(getFoods({page,refrigera_id:qr}));
    setIsFetching(true);
  };

  return (
    
    <View style={styles.container}>
      <View style={styles.head_table}>
        <TouchableOpacity  style={[styles.fitler,{borderColor:colorFilterType}]} onPress={ ()=>clickFilter(dispatch,flatListRef,filterFoods.type,filterIcon) }>
          <MaterialCommunityIcons name="filter" size={25} color={colorFilterType}/>
          <Text style={{color:colorFilterType}}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => clickName(dispatch,flatListRef,filterFoods.name,filterIcon) } style={[styles.name,{borderColor:nameBorderColor}]}>
          <Text style={{color:nameBorderColor}}>Name <Ionicons name={iconFilterName} /></Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.plus,{borderColor:dateBorderColor}]} onPress={() => clickDate(dispatch,filterFoods.date,filterIcon) }>
          <Text style={{color:dateBorderColor}}>Date </Text>
          <MaterialCommunityIcons  name={iconFilterDate} color={dateBorderColor} size={20}/>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ 
          // backgroundColor:"red",
          width:"100%"}}
          data={listFoods}
          renderItem={({item}) =>renderItem({item,dispatch,mode:filterFoods.date})}
          ref={(ref) => { flatListRef = ref; }}
          keyExtractor={item => item.code}
          onEndReachedThreshold={0.5}
          onEndReached={()=>onEnd(dispatch,page,qr)}
          ListEmptyComponent={<Empty/>}
          progressViewOffset={100}
          onRefresh={onRefresh}
          refreshing={isFetching}
      />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:"100%",
  },
  modal:{
    backgroundColor: 'red', padding: 20,
    flex:1
  },
  head_table:{ 
    flexDirection:"row",
    borderBottomColor:"#757575",
    borderBottomWidth:1,
    paddingBottom:10,
    paddingLeft:10,
    margin:10,
  },
  item: {
    flexDirection:"row",
    marginBottom: 8,
    paddingVertical:20,
    marginHorizontal: 8,
    borderRadius:4,
  },
  fitler:{ 
    justifyContent: 'center',
    flexDirection:"row",
    borderWidth:1,
    borderRadius:45,
    paddingLeft:10,
    paddingRight:10,
    alignItems:"center",
  },
  btn_remove:{
    flex:1,
    justifyContent: 'center',
  },
  name:{
    borderWidth:1,borderRadius:45,padding:5,alignContent:"center",marginHorizontal:10,
  },
  item_name:{
    flex:5,
    paddingHorizontal:20
  },
  plus:{ 
    alignItems:"center",
    flexDirection:"row",
    borderWidth:1,
    borderRadius:45,
    paddingLeft:10,
    paddingRight:10,
  },
  date_body:{
    flex:2,
    marginRight:10
  }
});

const Empty = () =>(
  <View style={{ width:"100%",paddingHorizontal:20,alignItems:"center"}}><Text>No Found Data</Text></View>
)

const renderItem = ({ item,dispatch,mode }) => {

  const color = item.type == 0 ? foodColors.red : item.type == 1 ? foodColors.green : foodColors.yellow;
  // const dispatch = useDispatch();

  const clickRemove = () =>
  Alert.alert('Remove', item.name, [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    { text: 'OK', onPress: () => {
      console.log("click remove")
      dispatch(removeFoods(item.code))
      dispatch(badgeReducers({type:"BADGE",module:'FOODS',command:'remove'}))
    }},
  ]);

  return(
    <View style={[styles.item,{backgroundColor:color}]}>
      
      <View style={styles.item_name}><Text>{item.name}</Text></View>
      { (mode == 0 || mode == 1) && <View style={styles.date_body}>
        <Text>{item.date}</Text><Text>{item.time}</Text> 
      </View>
      }
      { (mode == 2 || mode == 3) && <View style={styles.date_body}>
        <Text>{item.sort_time_txt}</Text>
      </View>
      }
      <View style={styles.btn_remove} >
        <TouchableOpacity onPress={ clickRemove } style={{ marginRight:15 }}>
          <FontAwesome name="remove" size={20} color="#424242" />
        </TouchableOpacity>  
      </View>
    </View>
  )
};     

