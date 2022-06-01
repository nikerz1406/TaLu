import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Header } from "../layout/header";
import { Qr } from "../views/qr";
import { FoodLists } from "../views/foods";
import { Plus } from "../views/plus";
import { Recycle } from "../views/recycle";
import { Refrige } from '../views/refrigerator';

export const Template = (props) => {

  return (
    <SafeAreaView style={styles.container}>
      <Header title={props.screen}/>
      <View style={styles.screen}>
        {props.screen == 'Qrcode' && <Qr/> }
        {props.screen == 'Plus' && <Plus/>}
        {props.screen == 'Foods' && <FoodLists/>}
        {props.screen == 'Recycle' && <Recycle/>}
        {props.screen == 'Refrigerator' && <Refrige/>}
      </View>
    </SafeAreaView>
  )
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
    screen:{
        flex:6,
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width:"100%"
      }
  });