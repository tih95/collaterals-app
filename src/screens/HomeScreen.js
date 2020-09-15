import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity }  from 'react-native';
import { FlatGrid } from 'react-native-super-grid'

import Icon from 'react-native-vector-icons/Ionicons';

const data = [
   {page: 'Speakers', icon: 'md-microphone'},
   {page: 'Schedule', icon: 'md-calendar'},
   {page: 'CheckIn', icon: 'md-qr-scanner'},
   {page: 'Sponsors', icon: 'md-business'},
   {page: 'Endorsements', icon: 'md-ribbon'},
   {page: 'Account', icon: 'md-person'},
   {page: 'Survey', icon: 'md-paper'}
]

const HomeScreen = (props) => {
   const renderItem = (item) => {
      return (
         <TouchableOpacity
            onPress={() => props.navigation.navigate(`${item.page}`)} >
            <View style={styles.iconSquare}>
               <Icon name={`${item.icon}`}
                  size={70} >
               </Icon>
               <Text style={{fontFamily: 'poppins-light', letterSpacing: 1}}>{`${item.page}`}</Text>
            </View>
         </TouchableOpacity>
      )
   }

   return (
      <SafeAreaView  style={styles.container}> 
         <FlatGrid 
            itemDimension={130}
            style={styles.gridView}
            items={data}
            renderItem={({item}) => renderItem(item)}
         />
         
      </SafeAreaView>
   )
}

HomeScreen.navigationOptions = {
   headerTitle: 'Welcome to Collaterals 2019!',
   headerTitleStyle: {
      fontFamily: 'poppins-light',
      letterSpacing: 1
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   gridView: {
      marginTop: 20
   }, 
   iconSquare: {
      alignItems: 'center',
      marginBottom: 40
   }
})

export default HomeScreen;