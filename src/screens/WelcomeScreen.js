import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image }  from 'react-native';
import { Button } from 'react-native-ui-lib';
import * as Animatable from 'react-native-animatable';

const WelcomeScreen = (props) => {
   const navSignin = () => {
      props.navigation.navigate('Signin')
   }

   const navSignup = () => {
      props.navigation.navigate('Signup');
   }

   return (
      <SafeAreaView style={styles.container}>
         <Animatable.View animation="fadeInDown" style={styles.cardContainer}>
            <Image style={styles.image} source={require("../../assets/collaterals-logo.png")} />
            <Text style={styles.heading}>Welcome to Collaterals 2019!</Text>
         </Animatable.View>
         <Animatable.View animation="fadeInUp" style={styles.buttonContainer}>
            <Button
               round={false}
               labelStyle={{fontFamily: 'poppins-light', letterSpacing: 1}}
               borderRadius={5}
               label="Sign In"
               color='white'
               onPress={navSignin}
               style={styles.button}
               enableShadow={true}
            />
            <Button
               round={false}
               labelStyle={{fontFamily: 'poppins-light', letterSpacing: 1}}
               borderRadius={5}
               label="Create Account"
               color='white'
               onPress={navSignup}
               style={styles.button}
               enableShadow={true}
            />
         </Animatable.View>
      
      </SafeAreaView>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   cardContainer: {
      width: '85%'
   },
   image: {
      width: 210,
      height: 210,
      marginTop: 30,
      resizeMode: 'contain',
      alignSelf: 'center'
   },
   heading: {
      fontSize: 32,
      color: 'black',
      textAlign: 'center',
      letterSpacing: 1,
      fontFamily: 'poppins-light'
   },
   button: {
      marginTop: 30, 
   },
   buttonContainer: {
      marginBottom: 50,
      width: '70%'
   }
})

WelcomeScreen.navigationOptions = {
   header: null
}

export default WelcomeScreen;