import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Header } from "../layout/header";
import { Qr } from "../views/qr";
import { Lists } from "../views/lists";
import { Record } from "../views/record";
import { Refrige } from '../views/refrigerator';

export const Template = (props) => {
  
  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <View style={styles.screen}>
        {props.screen == 'qrcode' && <Qr/> }
        {props.screen == 'audio' && <Record/>}
        {props.screen == 'foods' && <Lists/>}
        {props.screen == 'refrige' && <Refrige/>}
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
        flex:4,
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width:"100%"
      }
  });