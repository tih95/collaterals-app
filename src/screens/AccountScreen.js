import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-ui-lib';
import * as WebBrowser from 'expo-web-browser';
import Icon from 'react-native-vector-icons/Ionicons';

import * as firebase from 'firebase';
import '@firebase/firestore';

const AccountScreen = (props) => {

   const [displayName, setDisplayName] = useState('');
   const [email, setEmail] = useState('');

   useEffect(() => {
      setDisplayName(firebase.auth().currentUser.displayName);
      setEmail(firebase.auth().currentUser.email);
   }, [])

   const refresh = () => {
      setDisplayName(firebase.auth().currentUser.displayName);
      setEmail(firebase.auth().currentUser.email);
   }

   const goToEditProfile = () => {
      props.navigation.navigate('EditProfile', {refresh: refresh})
   }

   const signOut = () => {
      firebase.auth().signOut()
       .then(() => {
          props.navigation.navigate('AuthLoading');
       })
   }

   return (
      <SafeAreaView style={styles.container}>
         <Text style={styles.accountInfoText}>{displayName}</Text>
         <Text style={{color: 'black', textAlign: 'center', fontFamily: 'poppins-extra-light'}}>{email}</Text>
         <TouchableOpacity
            style={{marginTop: 70, flexDirection: 'row', alignItems: 'center'}}
            onPress={goToEditProfile}   
         >
            <Icon name="md-create" size={25} />
            <Text style={{fontSize: 26, fontFamily: 'poppins-light', marginLeft: 5, color: '#00818a'}}>Edit Profile</Text>
         </TouchableOpacity>
         <TouchableOpacity
            style={{marginTop: 10, flexDirection: 'row', alignItems: 'center'}}
            onPress={() => WebBrowser.openBrowserAsync('http://collateralperfusion.org/privacy-policy')}   
         >
            <Text style={{fontSize: 26, fontFamily: 'poppins-light', marginLeft: 5, color: '#00818a'}}>Privacy Policy</Text>
         </TouchableOpacity>
         <Button 
            color={'white'} 
            style={styles.signOutButton} 
            label="Sign out" 
            labelStyle={{fontFamily: 'poppins-light', letterSpacing: 1}}
            onPress={signOut} 
            round={false}
            borderRadius={5}
            enableShadow={true}
         />
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: 'white',
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      marginTop: 25
    },
    text: {
      color: 'black',
      textAlign: 'center',
      fontSize: 28,
      letterSpacing: 2,
      fontWeight: '300',
    },
    accountInfoText: {
      color: 'black',
      textAlign: 'center',
      fontSize: 24,
      fontWeight: '300',
      marginTop: 40,
      marginBottom: 5,
      fontFamily: 'poppins-light'
    },
    signOutButton: {
      position: 'absolute',
      bottom: 50,
      width: '80%',
      alignSelf: 'center'
    },
    edit: {
       flex: 1,
       flexDirection: 'row'
    }
})

AccountScreen.navigationOptions = {
   headerTitle: 'Your Account',
   headerTitleStyle: {
      fontFamily: 'poppins-light',
      letterSpacing: 1
   }
}

export default AccountScreen;