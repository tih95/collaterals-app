import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Alert } from 'react-native';
import { TextField, Button } from 'react-native-ui-lib';

import Loader from '../components/Loader';

import * as firebase from 'firebase';
import '@firebase/firestore';

const SignupScreen = () => {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [emailErrorMessage, setEmailErrorMessage] = useState(null)
   const [errorMessage, setErrorMessage] = useState(null);
   const [loading, setLoading] = useState(false);

   const handleNameInput = (name) => {
      setName(name);
   }

   const handleEmailInput = (email) => {
      setEmail(email);
      setEmailErrorMessage(null)
      setErrorMessage(null);
   }

   const handlePasswordInput = (password) => {
      setPassword(password);
      setErrorMessage(null);
   }

   const handleConfirmPassword = (confirmPassword) => {
      setConfirmPassword(confirmPassword);
      setErrorMessage(null);
   }

   const emailIsValid = (email) => {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

   const handleSignUp = () => {
      if (!emailIsValid(email)) {
         setEmailErrorMessage('Please enter a valid email');
      }
      else if (password === confirmPassword) {
         setLoading(true);
         firebase
           .auth()
           .createUserWithEmailAndPassword(email, password)
           .then(cred => { 
            cred.user.updateProfile({
               displayName: name
            });

            let todayDate = new Date();
            todayDate.setHours(0,0,0,0);

            firebase
              .firestore()
              .collection('users')
              .add({
               userId: cred.user.uid,
               name: name,
               favoriteEvents: [],
               checkedIn: false,
               checkInTime: todayDate,
               surveyCompleted: false
            })
         })
         .then(() => {
            setLoading(false)
            props.navigation.navigate('Home');
         })
         .catch(error => {
            setLoading(false);
            if (error.code === 'auth/weak-password') {
               
               setErrorMessage('Password is too weak');
            }
            else {
               setErrorMessage(error.message);
            }
         })
      }
      else {
         Alert.alert('Passwords do not match!');
         setPassword('');
         setConfirmPassword('');
      }   
      
   }

   return (
      <SafeAreaView style={styles.container}>
         <Loader loading={loading}/>
         <View style={styles.formContainer}>
            <TextField
               placeholder='Name'
               style={{fontFamily: 'poppins-light', letterSpacing: 1}}
               floatingPlaceholder
               floatingPlaceholderColor={{focus: "black"}}
               color='black'
               underlineColor={{default: 'black', focus: 'black'}}
               onChangeText={(name) => handleNameInput(name)}
               value={name}
               floatOnFocus
               returnKeyType="next"
               onSubmitEditing={() => this.emailRef.focus()}
            />
            <TextField
               style={{fontFamily: 'poppins-light', letterSpacing: 1}}
               ref={emailRef => this.emailRef = emailRef}
               placeholder='Email'
               floatingPlaceholder
               floatingPlaceholderColor={{focus: "black"}}
               color='black'
               underlineColor={{default: 'black', focus: 'black'}}
               onChangeText={(email) => handleEmailInput(email)}
               value={email}
               floatOnFocus
               keyboardType="email-address"
               returnKeyType="next"
               onSubmitEditing={() => this.passwordRef.focus()}
            />
            {emailErrorMessage &&
            <Text style={{ color: 'red', marginBottom: 10 }}>
               {emailErrorMessage}
            </Text>}
            <TextField
               style={{fontFamily: 'poppins-light', letterSpacing: 1}}
               ref={passwordRef => this.passwordRef = passwordRef}
               secureTextEntry={true}
               placeholder='Password'
               floatingPlaceholder
               floatingPlaceholderColor={{focus: "black"}}
               color='black'
               underlineColor={{default: 'black', focus: 'black'}}
               onChangeText={password => handlePasswordInput(password)}
               value={password}
               floatOnFocus
               returnKeyType="next"
               onSubmitEditing={() => this.confRef.focus()}
            />
            <TextField
               style={{fontFamily: 'poppins-light', letterSpacing: 1}}
               ref={confRef => this.confRef = confRef}
               secureTextEntry={true}
               placeholder='Confirm Password'
               floatingPlaceholder
               floatingPlaceholderColor={{focus: "black"}}
               color='black'
               underlineColor={{default: 'black', focus: 'black'}}
               onChangeText={confirmPassword => handleConfirmPassword(confirmPassword)}
               value={confirmPassword}
               floatOnFocus
               returnKeyType="done"
            />
            {errorMessage &&
            <Text style={{ color: 'red' }}>
               {errorMessage}
            </Text>}
         </View>
         <Button
            round={false}
            labelStyle={{fontFamily: 'poppins-light', letterSpacing: 1}}
            borderRadius={5}
            label="Sign Up"
            style={styles.button}
            enableShadow={true}
            onPress={handleSignUp}
            disabled={!email.length || !password.length
               || !name.length || !confirmPassword.length}
         />
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
   },
   formContainer: {
      flex: 1,
      width: '70%',
      marginTop: 30
   },
   button: {
      marginBottom: 20,
      width: '70%'
   }
})

SignupScreen.navigationOptions = {
   headerTitle: 'Create Your Account',
   headerTitleStyle: {
      fontFamily: 'poppins-light',
      letterSpacing: 1
   }
}

export default SignupScreen;