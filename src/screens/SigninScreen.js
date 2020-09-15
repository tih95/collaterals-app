import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { TextField, Button } from 'react-native-ui-lib';

import * as firebase from 'firebase';

import Loader from '../components/Loader';

const SigninScreen = (props) => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [errorMessage, setErrorMessage] = useState(null);
   const [loading, setLoading] = useState(false);

   const handleEmail = (email) => {
      setEmail(email);
      setErrorMessage(null);
   }

   const handlePassword = (password) => {
      setPassword(password);
      setErrorMessage(null);
   }

   const handleSignin = () => {
      setLoading(true);
      firebase.auth().signInWithEmailAndPassword(email, password)
       .then(() => {
          setLoading(false);
          props.navigation.navigate('Home');
       })
       .catch(error => {
          setErrorMessage(error.message);
          setLoading(false);
       })
   }

   const navigateSignup = () => {
      props.navigation.navigate('Signup');
   }

   const navigateForgotPassword = () => {
      props.navigation.navigate('ForgotPassword');
   }

   return (
      <SafeAreaView style={styles.container}>
         <Loader loading={loading} />
         <View style={styles.formContainer}>
            <TextField
               style={{fontFamily: 'poppins-light', letterSpacing: 1}}
               floatingPlaceholder
               floatingPlaceholderColor={{focus: 'black'}}
               placeholder="Email"
               color='black'
               underlineColor={{default: 'black', focus: 'black'}}
               onChangeText={(email) => handleEmail(email)}
               value={email}
               floatOnFocus
               keyboardType="email-address"
               returnKeyType="next"
               onSubmitEditing={() => this.passwordRef.focus()}
            />
            <TextField
               ref={passwordRef => this.passwordRef = passwordRef}
               style={{fontFamily: 'poppins-light', letterSpacing: 1}}
               secureTextEntry={true}
               floatingPlaceholder
               floatingPlaceholderColor={{focus: 'black'}}
               placeholder='Password'
               color='black'
               underlineColor={{default: 'black', focus: 'black'}}
               onChangeText={(password) => handlePassword(password)}
               value={password}
               floatOnFocus
               returnKeyType="done"
               autoCorrect={false}
            />
            {errorMessage &&
            <Text style={{ color: 'red' }}>
               {errorMessage}
            </Text>}
            <Button
               label="Don't have an account?"
               labelStyle={{fontFamily: 'poppins-light', letterSpacing: 1}}
               link={true}
               style={{marginTop: 30}}
               onPress={navigateSignup}
            />
            <Button
               style={{marginTop: 20}}
               label="Forgot password?"
               labelStyle={{fontFamily: 'poppins-light', letterSpacing: 1}}
               link={true}
               onPress={navigateForgotPassword}
            />
         </View>
         <Button
            label="Sign In"
            labelStyle={{fontFamily: 'poppins-light', letterSpacing: 1}}
            color='white'
            enableShadow={true}
            onPress={handleSignin}
            round={false}
            borderRadius={5}
            style={{marginTop: 40, marginBottom: 50, width: '70%'}}
            disabled={!password.length || !email.length}
         />
      </SafeAreaView>
   )
}

SigninScreen.navigationOptions = {
   headerTitle: "Sign In",
   headerTitleStyle: {
      fontFamily: 'poppins-light',
      letterSpacing: 1
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between'
   },
   formContainer: {
      marginTop: 50,
      marginBottom: 75,
      width: '80%',
    }
})

export default SigninScreen;