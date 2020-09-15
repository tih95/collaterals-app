import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { Button, TextField } from 'react-native-ui-lib';

import Loader from '../components/Loader';

import * as firebase from 'firebase';

const EditProfileScreen = (props) => {
   const [username, setUsername] = useState('');
   const [newPassword, setNewPassword] = useState('');
   const [loading, setLoading] = useState(false);
   const [errorMessage, setErrorMessage] = useState(null);

   useEffect(() => {
      setUsername(firebase.auth().currentUser.displayName);
   }, [])

   const handleSaveChanges = () => {
      setLoading(true);

      firebase.auth().currentUser.updateProfile({displayName: username})
       .then(() => {
         if (newPassword !== '') {
            firebase.auth().currentUser.updatePassword(newPassword)
             .then(() => {
               setLoading(false);
                  firebase.auth().signOut().then(() => props.navigation.navigate('AuthLoading'))
               })
             .catch((error) => {
               if (error.code === 'auth/weak-password') {
                  setLoading(false);
                  setErrorMessage('Password is too weak');
               }
               else {
                  setLoading(false);
                  setErrorMessage(error.message);
               }
            })
         }
         else {
            props.navigation.state.params.refresh();
            setLoading(false);
            props.navigation.goBack();
         }
      })
   }

   return (
      <SafeAreaView style={styles.container}>
            <Loader loading={loading} />
            <View style={styles.inputFields}>
               <TextField 
                  floatingPlaceholder={true}
                  floatOnFocus={true}
                  floatingPlaceholderColor={{focus: 'black'}}
                  placeholder='Name'
                  color='black'
                  style={{fontFamily: 'poppins-light'}}
                  value={username}
                  autoCorrect={false}
                  onChangeText={username => setUsername(username)}
               />
               <TextField 
                  floatingPlaceholder={true}
                  floatOnFocus={true}
                  floatingPlaceholderColor={{focus: 'black'}}
                  placeholder='New Password'
                  fontFamily={{fontFamily: 'poppins-light',}}
                  onChangeText={newPassword => {
                     setNewPassword(newPassword);
                     setErrorMessage(null);
                  }}
                  autoCorrect={false}
                  secureTextEntry={true}
                  color='black'
               />
               {errorMessage &&
               <Text style={{ fontFamily: 'poppins-light', color: 'red', marginBottom: 10 }}>
                  {errorMessage}
               </Text>}
               <Text
                  style={{color: 'grey', fontFamily: 'poppins-italic',}}>
                  Note: Changing password will sign you out and you will have to login again with new password
               </Text>
               {(firebase.auth().currentUser.displayName === username)
                     && (newPassword === '') ? null : 
               <Button 
                  label='Save Changes'
                  onPress={handleSaveChanges}
                  style={{marginTop: 15}}
                  labelStyle={{fontFamily: 'poppins-light',}}
                  round={false}
                  borderRadius={5}
                  enableShadow={true}
               />}
               
            </View>
            
         </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      marginTop: 25
   },
   inputFields: {
      flex: 1,
      width: '80%',
      alignSelf: 'center',
      marginTop: 50
   }
})

EditProfileScreen.navigationOptions = {
   headerTitle: 'Edit Profile',
   headerTitleStyle: {
      fontFamily: 'poppins-light',
      letterSpacing: 1
   }
}

export default EditProfileScreen;