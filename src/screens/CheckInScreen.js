import React, { useState, useEffect } from 'react';
import { Alert, SafeAreaView, View, StyleSheet, Text, Platform } from 'react-native';
import { Button } from 'react-native-ui-lib';
import * as Permissions from 'expo-permissions';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

import { BarCodeScanner } from 'expo-barcode-scanner';
import * as firebase from 'firebase';
import '@firebase/firestore';

const CheckInScreen = (props) => {
   const [scanned, setScanned] = useState(false);
   const [hasCameraPermission, setHasCameraPermission] = useState(null);
   const [checkedIn, setCheckedIn] = useState(null);

   useEffect(() => {
      async function checkPermission() {
         const { status } = await Permissions.getAsync(Permissions.CAMERA);
         if (status === 'granted') {
            console.log(' already has permission')
            setHasCameraPermission(true)
         }
         else {
            const {status} = await Permissions.askAsync(Permissions.CAMERA);
            if (status === 'granted') {
               console.log('allowed!')
               setHasCameraPermission(true);
            }
            else {
               console.log('rejected');
               setHasCameraPermission(false);
            }
         }
      }
      checkPermission();
      
   }, [])

   useEffect(() => {
      const userCollection = firebase.firestore().collection('users');
      userCollection.where('userId', '==', firebase.auth().currentUser.uid).get()
         .then(snapshot => {
            snapshot.forEach(doc => {
            data = doc.data();
            })

            setCheckedIn(data.checkedIn);
         })
      
   }, [])

   const handleBarCodeScanned = ({ type, data }) => {
      const userCollection = firebase.firestore().collection('users');
      
      console.log(data);
      setScanned(true);
      if (data === 'collaterals' && !checkedIn) {
         console.log('equal')
         userCollection.where('userId', '==', firebase.auth().currentUser.uid).get()
         .then((snapshot) => {
           snapshot.forEach(doc => {
             userCollection.doc(doc.id).update({checkedIn: true, checkInTime: new Date()})
           })
           
         });
   
         setCheckedIn(true);
       }
      
   }

   const getPermission = async () => {
      console.log('getting permission');
      if (Platform.OS === 'ios') {
         Alert.alert('Please go to your settings and enable camera permission')
      }
      else {
         const { status } = await Permissions.askAsync(Permissions.CAMERA);
         if (status === 'granted') {
            console.log('allowed!')
            setHasCameraPermission(true);
         }
         else {
            console.log('rejected');
            setHasCameraPermission(false);
         }
      }
   }

   // Return functions down below
   // --------------------------------------------------------------------------------------------------
   if (checkedIn === null) {
      return null;
   }
   
   if (checkedIn) {
      return (
         <Animatable.View animation="bounceIn" style={styles.checkedInContainer}>
            <Icon
               name="md-checkmark-circle-outline"
               size={150}
            />
            <Text style={{fontSize: 38, fontFamily: 'poppins-regular', textAlign: 'center'}}>You are checked in!</Text>
         </Animatable.View>
      )
   }
   if (hasCameraPermission === false) {
      return (
         <SafeAreaView style={styles.noPermissionsContainer}>
            <Button 
               label="Ask permission"
               onPress={getPermission}
            />
         </SafeAreaView>
      )
   }



   return (
      <BarCodeScanner 
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={[StyleSheet.absoluteFill, styles.barCodeScanner]}
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
         >
         <Text style={styles.description}>Scan QR Code at the registration table</Text>
      </BarCodeScanner>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
   noPermissionsContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   checkedInContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
   description: {
      fontSize: 22,
      marginTop: '10%',
      textAlign: 'center',
      width: '70%',
      fontFamily: 'poppins-light',
      color: Platform.OS === 'ios' ? 'white' : 'black'
   },
   barCodeScanner: {
      flex: 1,
      alignItems: 'center',
   }
})

CheckInScreen.navigationOptions = {
   headerTitle: 'Check In',
   headerTitleStyle: {
      fontFamily: 'poppins-light',
      letterSpacing: 1
   }
}

export default CheckInScreen;