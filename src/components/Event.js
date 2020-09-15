import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

import * as firebase from 'firebase';
import '@firebase/firestore';

const Event = (props) => {
   const userCollection = firebase.firestore().collection('users');
   const [isFavorited, setIsFavorited] = useState(false);

   useEffect(() => {
      console.log('running effect');
      const favorited = checkIfFavorite(props.event);

      setIsFavorited(favorited);
   }, [props.favoriteEvents])

   const checkIfFavorite = (event) => {
      console.log('checking if favorite');
      console.log(event);
      for (let i = 0; i < props.favoriteEvents.length; i++) {
         if (props.favoriteEvents[i].country === event.country) {
           return true;
         }
       }
       return false;
   }

   const handleFavorites = (event) => {
      console.log('handling favorite');
      let faves = [];

      if (isFavorited) {
         setIsFavorited(false);
         userCollection.where('userId', '==', firebase.auth().currentUser.uid).get()
          .then(snapshot => {
            snapshot.forEach(doc => {
               faves = doc.get('favoriteEvents');
               let filteredFaves = faves.filter(item => item.country !== event.country);
               filteredFaves.sort((a, b) => {
               if (a.day > b.day) {
                  return 1;
               }
               else if (a.day < b.day) {
                  return -1;
               }
               else if (a.startTime > b.startTime) {
                  return 1;
               }
               else if (a.startTime < b.startTime) {
                  return -1;
               }
               else {
                  return 0;
               }
            })
            userCollection.doc(doc.id).update({favoriteEvents: filteredFaves}).then(() => {
               props.setShowUnfavoriteToast(true);
               props.setFavoriteEvents(filteredFaves);
            });
          })
         });
      }
      else {
         setIsFavorited(true);
         userCollection.where('userId', '==', firebase.auth().currentUser.uid).get()
         .then((snapshot) => {
            snapshot.forEach(doc => {
               faves = doc.get('favoriteEvents');
               faves.push(event);

               userCollection.doc(doc.id).update({favoriteEvents: faves}).then(() => {
                  props.setShowFavoriteToast(true);
                  props.setFavoriteEvents(faves);
               });
            })
         });
      }
   }

   const currentTime = moment().unix();

   return (
      <View style={styles.listContainer}>
         <View style={styles.time}>
            <Text style={{fontFamily: 'poppins-light', letterSpacing: 1}}>{moment.unix(props.event.startTime).format('HH:mm')}</Text>
            <Text style={{fontFamily: 'poppins-light', fontSize: 10}}>{moment.unix(props.event.startTime).format('MMM, Do')}</Text>
         </View>
         <View style={styles.lineContainer}>
            {props.flags}
            <View style={{marginTop: 4, width: 1, flex: 1, backgroundColor: 'black'}}></View>
         </View>
         <View style={styles.eventContainer}>
            <View style={{ flexDirection: 'row'}}>
               <Text 
                  style={{fontFamily: 'poppins-medium', fontSize: 16, marginBottom: 5, letterSpacing: 1, flex: 1}}>
                  {props.event.country}
               </Text>
               <Text style={{fontSize: 9, fontFamily: 'poppins-extra-light'}}>{(currentTime >= props.event.startTime && currentTime < props.event.endTime) ? ' Happening Now' : 
                  (currentTime  < props.event.startTime) ? moment.unix(currentTime).to(moment.unix(props.event.startTime)) : 'Done'}
               </Text>
            </View>
            <View style={{paddingLeft: 10, fontFamily: 'poppins-thin'}}>
               {props.speakers}
            </View>
            <View style={{width: 30}}>
               <TouchableOpacity 
                  style={{width: 30}}
                  onPress={() => handleFavorites(props.event)}
               >
                  <Icon 
                     name={isFavorited ? 'md-star' : 'md-star-outline'} 
                     size={35} 
                     style={{width: 30}}>
                  </Icon>
               </TouchableOpacity>
            </View>
            <View style={styles.separator}></View>
         </View>
      </View>
   )
}

const styles = StyleSheet.create({
   listContainer: {
      flex: 1,
      flexDirection: 'row',
      paddingTop: 10
  },
   time: {
      justifyContent: 'center',
      paddingLeft: 8,
      paddingRight: 8,
   },
   lineContainer: {
      alignItems: 'center',
      marginRight: 8
   },
   eventContainer: {
      flex: 1,
      marginRight: 8
   },
   separator: {
      height: 0.75,
      backgroundColor: 'grey',
      marginTop: 6,
      marginBottom: 6
   },
})

export default Event;