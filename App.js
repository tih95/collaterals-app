import React, { useEffect } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as Font from 'expo-font';

import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import HomeScreen from './src/screens/HomeScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import CheckInScreen from './src/screens/CheckInScreen';
import AccountScreen from './src/screens/AccountScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import SponsorsScreen from './src/screens/SponsorsScreen';
import EndorsementsScreen from './src/screens/EndorsementsScreen';
import SpeakersScreen from './src/screens/SpeakersScreen';
import SpeakerPage from './src/screens/SpeakerPage';
import SurveyScreen from './src/screens/SurveyScreen';

import * as firebase from 'firebase';
import ScheduleScreen from './src/screens/ScheduleScreen';

console.ignoredYellowBox = [
  'Setting a timer'
  ];

const firebaseConfig = {
  apiKey: "AIzaSyDo2sHvxGmF5QTBOnxESe53Ac5maA3K08k",
  authDomain: "collaterals-a4aa0.firebaseapp.com",
  databaseURL: "https://collaterals-a4aa0.firebaseio.com",
  projectId: "collaterals-a4aa0",
  storageBucket: "",
  messagingSenderId: "551985806675",
  appId: "1:551985806675:web:5e2df5ab3db2c1320135a6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const AuthStackNavigator = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    Signin: SigninScreen,
    Signup: SignupScreen,
    ForgotPassword: ForgotPasswordScreen
  },
  {
    initialRoute: 'Welcome'
  }
)

const HomeStackNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Account: AccountScreen,
    EditProfile: EditProfileScreen,
    Schedule: ScheduleScreen,
    CheckIn: CheckInScreen,
    Sponsors: SponsorsScreen,
    Endorsements: EndorsementsScreen,
    Speakers: SpeakersScreen,
    Speaker: SpeakerPage,
    Survey: SurveyScreen
  },
  {
    initialRouteName: 'Home',
    headerMode: 'screen',
  }
)

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStackNavigator,
    HomeStack: HomeStackNavigator
  },
  {
    initialRouteName: 'AuthLoading'
  }
))

const App = () => {

  useEffect(() => {
    Font.loadAsync({
      'poppins-light': require('./assets/fonts/Poppins-Light.ttf'),
      'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
      'poppins-semibold': require('./assets/fonts/Poppins-SemiBold.ttf'),
      'poppins-extra-light': require('./assets/fonts/Poppins-ExtraLight.ttf'),
      'poppins-thin-italic': require('./assets/fonts/Poppins-ThinItalic.ttf'),
      'poppins-thin': require('./assets/fonts/Poppins-Thin.ttf'),
      'poppins-italic': require('./assets/fonts/Poppins-Italic.ttf'),
      'poppins-medium': require('./assets/fonts/Poppins-Medium.ttf')
    });
  }, [])
  return (
    <AppContainer />
  )
}

export default App;