import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Text, View, Button, Image } from 'react-native-ui-lib';
import * as WebBrowser from 'expo-web-browser';

import Flags from '../Flags';


const SpeakerPage = (props) => {
   const speakerInfo = props.navigation.state.params.speaker


   let icon = Flags[speakerInfo.country];

   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.titleRow}>
            <Image 
               source={icon}
               style={styles.image}
            />
            <View>
               <Text style={{fontSize: 28, fontFamily: 'poppins-regular'}}>{speakerInfo.name}</Text>
               <Text style={{fontFamily: 'poppins-light'}}>{speakerInfo.country}</Text>
            </View>
         </View>
         <View style={styles.mainBody}>
            <Text style={{fontSize: 20, fontFamily: 'poppins-light', marginBottom: 70}}>Speaking Time: {speakerInfo.sessionTime}</Text>
            {speakerInfo.link !== '' ? 
            <Button 
               color={'white'} 
               style={{alignSelf: 'center'}}
               label="Tap here to learn more" 
               labelStyle={{fontFamily: 'poppins-light', letterSpacing: 1}}
               onPress={() => WebBrowser.openBrowserAsync(`${speakerInfo.link}`)} 
               round={false}
               borderRadius={5}
               enableShadow={true}
            /> : null}
            
         </View>
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   image: {
      width: 70,
      height: 70,
      marginRight: 10,
   },
   titleRow: {
      flexDirection: 'row',
      padding: 20
   },
   mainBody: {
      flexDirection: 'column',
      marginTop: 30,
      padding: 20
   },
   container: {
      flex: 1,
   }
})

export default SpeakerPage;