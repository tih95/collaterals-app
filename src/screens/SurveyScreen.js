import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet} from 'react-native';
import { Colors, Button, TextArea, TextField } from 'react-native-ui-lib';
import * as Animatable from 'react-native-animatable';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';

import * as firebase from 'firebase';
import '@firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';

/*
   Options: (On a scale of 1-10)

   Quality of speakers
   Quality of webinar
   Topics
   Meeting Format
   Collaborative Aspects
   How was your overall experience?
   Is there anything you'd like to see in the future?
   What country are you participating from or representing?
   What is your specialty? (Interventionalist, Neurosurgery, etc)
*/

const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const SurveyScreen = () => {
   const [speakerRating, setSpeakerRating] = useState(null);
   const [webinarRating, setWebinarRating] = useState(null);
   const [topicRating, setTopicRating] = useState(null);
   const [formatRating, setFormatRating] = useState(null);
   const [experienceRating, setExperienceRating] = useState(null)
   const [future, setFuture] = useState('');
   const [specialty, setSpecialty] = useState('');
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [surveyCompleted, setSurveyCompleted] = useState(null);

   useEffect(() => {
      const userCollection = firebase.firestore().collection('users');
      userCollection.where('userId', '==', firebase.auth().currentUser.uid).get()
         .then(snapshot => {
            snapshot.forEach(doc => {
            data = doc.data();
            })

            setSurveyCompleted(data.surveyCompleted);
         })
   }, [])

   const handleSubmit = () => {
      const userCollection = firebase.firestore().collection('users');

      setIsSubmitting(true);
      firebase.firestore().collection('surveys').add({
         speakerRating: speakerRating,
         webinarRating: webinarRating,
         topicRating: topicRating,
         formatRating: formatRating,
         experienceRating: experienceRating,
         future: future,
         specialty: specialty
      })
      .then(docref => {
         setIsSubmitting(false);
         setSurveyCompleted(true);
         console.log("Document written!")
      })
      .catch(error => {
         console.log(error);
         setIsSubmitting(false);
      })

      userCollection.where('userId', '==', firebase.auth().currentUser.uid).get()
         .then((snapshot) => {
           snapshot.forEach(doc => {
             userCollection.doc(doc.id).update({surveyCompleted: true});
           })
         });
   }

   const handleFutureChange = (future) => {
      setFuture(future);
   }

   if (surveyCompleted === null) {
      return null;
   }

   if (surveyCompleted) {
      return (
         <Animatable.View animation="bounceIn" style={styles.checkedInContainer}>
            <Icon
               name="md-checkmark-circle-outline"
               size={150}
            />
            <Text style={{ fontFamily: 'poppins-regular', fontSize: 38, textAlign: 'center'}}>You have completed the survey. Thank you!</Text>
         </Animatable.View>
      )
   }

   return (
      <SafeAreaView style={styles.container}>
         <ScrollView style={{padding: 20}}>
            <View style={styles.question}>
               <Text style={styles.text}>1. On a scale of 1-10, please rate the quality of speakers</Text>
               <ModalDropdown 
                  textStyle={{fontSize: 18, color: '#247BA0'}}
                  dropdownStyle={styles.dropdownMenu}
                  dropdownTextStyle={{fontSize: 16}}
                  style={styles.dropdownButton}
                  options={options}
                  onSelect={(index, value) => setSpeakerRating(value)}
               />
            </View>
            <View style={styles.question}>
               <Text style={styles.text}>2. On a scale of 1-10, please rate the quality of topics</Text>
               <ModalDropdown 
                  textStyle={{fontSize: 18, color: '#247BA0'}}
                  dropdownStyle={styles.dropdownMenu}
                  dropdownTextStyle={{fontSize: 16}}
                  style={styles.dropdownButton}
                  options={options}
                  onSelect={(index, value) => setTopicRating(value)}
               />
            </View>
            <View style={styles.question}>
               <Text style={styles.text}>3. On a scale of 1-10, please rate the quality of the webinar</Text>
               <ModalDropdown 
                  textStyle={{fontSize: 18, color: '#247BA0'}}
                  dropdownStyle={styles.dropdownMenu}
                  dropdownTextStyle={{fontSize: 16}}
                  style={styles.dropdownButton}
                  options={options}
                  onSelect={(index, value) => setWebinarRating(value)}
               />
            </View>
            <View style={styles.question}>
               <Text style={styles.text}>4. On a scale of 1-10, please rate the meeting format</Text>
               <ModalDropdown 
                  textStyle={{fontSize: 18, color: '#247BA0'}}
                  dropdownStyle={styles.dropdownMenu}
                  dropdownTextStyle={{fontSize: 16}}
                  style={styles.dropdownButton}
                  options={options}
                  onSelect={(index, value) => setFormatRating(value)}
               />
            </View>
            <View style={styles.question}>
               <Text style={styles.text}>5. On a scale of 1-10, how was your overall experience?</Text>
               <ModalDropdown 
                  textStyle={{fontSize: 18, color: '#247BA0'}}
                  dropdownStyle={styles.dropdownMenu}
                  dropdownTextStyle={{fontSize: 16}}
                  style={styles.dropdownButton}
                  options={options}
                  onSelect={(index, value) => setExperienceRating(value)}
               />
            </View>
            <View style={styles.question}>
               <Text style={styles.text}>6. Is there anything you'd like to see in the future?</Text>
               <View 
                  style={{
                     height: 150,
                     borderWidth: 1,
                     padding: 10,
                     borderColor: Colors.dark60,
                     width: '95%',
                     alignSelf: 'center'
                  }}>
                  <TextArea 
                     value={future}
                     onChangeText={(future) => handleFutureChange(future)}
                  />
               </View>
            </View>
            <View style={styles.question}>
               <Text style={styles.text}>7. What is your specialty? (Neurologist, interventionalist, etc..)</Text>
               <TextField 
                  placeholder="Enter specialty"
                  value={specialty}
                  onChangeText={(specialty) => setSpecialty(specialty)}
                  color="black"
               />
            </View>
            <Button
               disabled={!speakerRating && !webinarRating && !topicRating && !formatRating && !future && !experienceRating}
               iconOnRight={false}
               label={isSubmitting ? "Submitting..." : "Submit"}
               labelStyle={{fontFamily: 'poppins-light', letterSpacing: 1}}
               fullWidth={false}
               borderRadius={5}
               enableShadow={true}
               style={{width: '70%', alignSelf: 'center', marginTop: 20, }}
               onPress={handleSubmit}
            >
            </Button>
            <Text style={{fontStyle: 'italic', color: 'grey', marginBottom: 40, textAlign: 'center'}}>
               *Your answers will remain anonymous
            </Text>
         </ScrollView>
      </SafeAreaView>
   )
}

SurveyScreen.navigationOptions = {
   headerTitle: "Participant Survey",
   headerTitleStyle: {
      fontFamily: 'poppins-light',
      letterSpacing: 1
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   dropdownButton: {
      borderColor: Colors.dark60,
   },
   dropdownMenu: {
      width: 50,
   },
   text: {
      fontSize: 22,
      fontFamily: 'poppins-light',
      marginBottom: 10
   },
   question: {
      marginBottom: 20
   },
   checkedInContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
})

export default SurveyScreen;