import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';

import * as firebase from 'firebase';

const AuthLoadingScreen = (props) => {

   useEffect(() => {
      firebase.auth().onAuthStateChanged(user => {
         if (user) {
            props.navigation.navigate('HomeStack');
         }
         else {
            props.navigation.navigate('Auth');
         }
      })
   }, [])

   return (
      <View>
         <Modal
            transparent={true}
            visible={true}>
            <View style={styles.modalBackground}>
               <View style={styles.activityIndicatorWrapper}>
               <ActivityIndicator
                  animating={true} />
               </View>
            </View>
         </Modal>
      </View>
   )
}

const styles = StyleSheet.create({
   modalBackground: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
      backgroundColor: '#00000040'
   },
   activityIndicatorWrapper: {
      backgroundColor: '#FFFFFF',
      height: 100,
      width: 100,
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around'
   }
})

export default AuthLoadingScreen;