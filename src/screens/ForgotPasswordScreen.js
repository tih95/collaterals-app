import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TextField, Button } from 'react-native-ui-lib';

import * as firebase from 'firebase';

const ForgotPasswordScreen = (props) => {
   const [email, setEmail] = useState('');
   const [errorMessage, setErrorMessage] = useState(null);

   const handleEmailInput = (email) => {
      setEmail(email)
      setErrorMessage(null);
   }

   const handleForgotPassword = () => {
      firebase.auth().sendPasswordResetEmail(email)
       .then(user => {
          Alert.alert('Please check your email')
       })
       .then(() => {
          props.navigation.navigate('Signin');
       })
       .catch(e => {
          setErrorMessage(e.message);
       })
   }

   return (
      <View style={styles.screen}>
         <View style={styles.formContainer}>
            <TextField
               placeholder='Email'
               floatingPlaceholder
               floatingPlaceholderColor={{focus: "black"}}
               color='black'
               underlineColor={{default: 'black', focus: 'black'}}
               onChangeText={email => handleEmailInput(email)}
               value={email}
               floatOnFocus
               style={{fontFamily: 'poppins-light', letterSpacing: 1}}
            />
            {errorMessage &&
            <Text style={{ color: 'red', marginBottom: 10 }}>
               {errorMessage}
            </Text>}
            <Button
               round={false}
               borderRadius={5}
               label="Reset Password"
               style={{marginTop: 40}}
               onPress={handleForgotPassword}
               disabled={!email.length}
               enableShadow={true}
               labelStyle={{fontFamily: 'poppins-light', letterSpacing: 1}}
            />
         </View>
      </View>
   )
}

ForgotPasswordScreen.navigationOptions = {
   headerTitle: 'Forgot Your Password?',
   headerTitleStyle: {
      fontFamily: 'poppins-light',
   }
}

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      alignItems: 'center',
    },
    formContainer: {
      width: '70%',
      marginTop: 50,
    },
})

export default ForgotPasswordScreen;