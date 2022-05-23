import { View, FlatList, StyleSheet, Text,TouchableOpacity } from 'react-native';
import React,{ useEffect, useState,useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import { foodsReducers } from '../redux/Reducers/foodsSlice';
import { filterReducers } from '../redux/Reducers/filtersSlice';
import { badgeReducers } from '../redux/Reducers/badgeSlice';
import  { recycleReducers } from '../redux/Reducers/recycleSlice';

const clickFilter = (dispatch,flatListRef,mode,filterIcon)=>{
  console.log("click filter")
  dispatch(filterReducers({type:"FILTER_TYPE"}));
  dispatch(recycleReducers({type:"SORT_RECYCLE_TYPE",filterType:mode}));

  var color = mode == 0 ? "#EF5350" : mode == 1 ? "#FDD835" : "#66BB6A";
  filterIcon({type:color})

  flatListRef.scrollToOffset({ animated: true, offset: 0 });
}

const clickName = (dispatch,flatListRef,mode,filterIcon)=>{
  console.log("click filter name")

  dispatch(filterReducers({type:"FILTER_NAME"}));
  dispatch(recycleReducers({type:"SORT_RECYCLE_NAME",filterName:mode}));

  var icon = mode ? 'arrow-down' : 'arrow-up';
  filterIcon({name:icon})

  flatListRef.scrollToOffset({ animated: true, offset: 0 });
}
const clickDate = (dispatch,mode,filterIcon)=>{
  console.log("click date")
  dispatch(filterReducers({type:"FILTER_DATE"}));
  dispatch(recycleReducers({type:"SORT_RECYCLE_DATE",filterDate:mode}));

  var icon = mode ? 'calendar-text' : 'calendar-week';
  filterIcon({date:icon})

}

export const Recycle = () => {
  const dispatch = useDispatch();
  const [colorFilterType,setColorFilterType] = useState('#424242');
  const [isFetching, setIsFetching] = useState(false);
  const filterFoods = useSelector((state) => state.filterFoods);
  var flatListRef = null;
  const [iconFilterName,setIconFilterName] = useState('md-search-outline');
  const [iconFilterDate,setIconFilterDate] = useState('text-search');

  const filterIcon = function({ 
    // default value
    name='md-search-outline',
    type='#424242',
    date='text-search'
  }){
    setColorFilterType(type)
    setIconFilterName(name)
    setIconFilterDate(date)
  }

  const history = useSelector((state)=>state.history)
  // console.log({history1:history})
  // dispatch({type:'BADGE',module:'RECYCLE',command:'remove'})

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = dispatch(badgeReducers({type:"BADGE",module:'RECYCLE',command:'remove'}))
      return () => unsubscribe;
    }, [history])
  );

  return (
    <View style={styles.container}>
      <View style={styles.head_table}>
        <View style={styles.fitler}>
          <TouchableOpacity onPress={ ()=>clickFilter(dispatch,flatListRef,filterFoods.type,filterIcon) }>
           <MaterialCommunityIcons name="filter" size={25} color={colorFilterType}/>
          </TouchableOpacity>
        </View>
        <View style={styles.name}>
          <TouchableOpacity onPress={() => clickName(dispatch,flatListRef,filterFoods.name,filterIcon) } style={{width:"30%"}}>
            <Text syle={{ fontWeight:"bold" }}>Name <Ionicons name={iconFilterName} /></Text>
          </TouchableOpacity>
        </View>
        <View style={styles.plus}>
          <TouchableOpacity onPress={() => clickDate(dispatch,filterFoods.date,filterIcon) }>
            <MaterialCommunityIcons  name={iconFilterDate} size={25}/>
          </TouchableOpacity>
        </View>
      </View>
      
      <FlatList
        style={{ 
          // backgroundColor:"red",
          width:"100%"}}
        data={history}
        renderItem={({item}) =>renderItem({item,dispatch,mode:filterFoods.date})}
        ref={(ref) => { flatListRef = ref; }}
        keyExtractor={item => item.id}
        onEndReachedThreshold={0.5}
        // onEndReached={()=>onEnd(dispatch)}
        ListEmptyComponent={<Empty/>}
        progressViewOffset={100}
        refreshing={isFetching}
      />
    </View>
  );
};

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
  plus:{ 
    justifyContent: 'flex-end',
    alignItems:"flex-end",
    flex:2,
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

  const color = item.type == 0 ? "#EF5350" : item.type == 1 ? "#FDD835" : "#66BB6A";
  // const dispatch = useDispatch();

  const clickUndo = ()=>{
    console.log("click undo")
    // dispatch({type:"REMOVE_FOOD",id:item.id})

    dispatch(recycleReducers({type:"UNDO_RECYCLE",id:item.id}))
    dispatch(badgeReducers({type:"BADGE",module:'RECYCLE',command:'remove'}))
    dispatch(badgeReducers({type:"BADGE",module:'FOODS',command:'add'}))
    dispatch(foodsReducers({type:"ADD_FOOD",item}))
  }
  return(
    <View style={styles.item}>
    <View style={styles.fitler}>
      <TouchableOpacity onPress={ clickUndo } style={{ marginLeft:10 }}>
        <MaterialCommunityIcons name="undo-variant" size={30} color={color} />
      </TouchableOpacity>  
    </View>
    <View style={styles.name}><Text>{item.name}</Text></View>
    { (mode == 0 || mode == 1) && <View style={styles.date_body}>
      <Text>{item.date}</Text><Text>{item.time}</Text> 
    </View>
    }
    { (mode == 2 || mode == 3) && <View style={styles.date_body}>
      <Text>{item.sort_time_txt}</Text>
    </View>
    }
  </View>
  )
};   
