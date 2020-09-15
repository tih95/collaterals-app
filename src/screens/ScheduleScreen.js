import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { Image, Text, View, Button, ActionSheet, Toast } from 'react-native-ui-lib';

import Event from '../components/Event';

import * as firebase from 'firebase';
import '@firebase/firestore';

import Flags from '../Flags';

import * as data from '../data.json';

const ScheduleScreen = () => {
  const userCollection = firebase.firestore().collection('users');
  const [events, setEvents] = useState([]);
  const [favoriteEvents, setFavoriteEvents] = useState([]);
  const [mode, setMode] = useState('day1');
  const [pickerVisible, setPickerVisible] = useState(false);
  const [showFavoriteToast, setShowFavoriteToast] = useState(false);
  const [showUnfavoriteToast, setShowUnfavoriteToast] = useState(false);

  useEffect(() => {
    let eventArray = [];
    let faves = [];

    eventArray = data.events.filter((item) => {
      return item.day === 1
    });
    
    userCollection.where('userId', '==', firebase.auth().currentUser.uid).get()
    .then((snapshot) => {
      snapshot.forEach(doc => {
        faves = doc.get('favoriteEvents');
      })
      setEvents(eventArray);
      setFavoriteEvents(faves);
    });
  }, [])

  // render each of the schedule cards
  renderItem = ({ item }) => {
    let speakers = item.speakers;
    let countries = [];

    countries = item.country.split(/[&,]/).map(item => item.trim());
    
    // is speakers is empty then return null otherwise return all list of speakers
    if (item.speakers.length === 0) {
      speakers = null;
    }
    else {
      speakers = speakers.map((speaker) => {
        return (
            <Text style={{marginTop: 3, fontSize: 12}}>{speaker.name}</Text>
        )
      })
      speakers.unshift(
        <Text style={{textDecorationLine: 'underline'}}>Speakers</Text>);
    }
    
    // if countries is empty return null, otherwise, return all countries and flags
    if (countries.length <= 0) {
      countries = null;
    }
    else {
      flags = countries.map(country => {
        return (
          <Image
            source={Flags[country]}
            style={{height: 20, width: 20, marginTop: 4}}
          />
        )
      })
    }

    return (
      <View>
        <Event 
          event={item}
          speakers={speakers}
          flags={flags}
          favoriteEvents={favoriteEvents}
          setFavoriteEvents={setFavoriteEvents}
          setShowFavoriteToast={setShowFavoriteToast}
          setShowUnfavoriteToast={setShowUnfavoriteToast}
        />
      </View>
    );
  };

  keyExtractor = item => item.country;

  filterList = (mode) => {
    if (mode === 'favorites') {
      userCollection.where('userId', '==', firebase.auth().currentUser.uid).get()
        .then((snapshot) => {
          snapshot.forEach(doc => {
            faves = doc.get('favoriteEvents');
            faves.sort((a, b) => {
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
            setEvents(faves);
            setMode('favorites');
          })
      });
    }
    else if (mode === 'day1') {
      let filtered = data.events.filter((item) => {
        return item.day === 1;
      })
      setEvents(filtered);
      setMode('day1');
    }
    else {
      let filtered = data.events.filter((item) => {
        return item.day === 2;
      })
      setEvents(filtered);
      setMode('day2');
    }
  }

  return (
      <SafeAreaView style={styles.mainContainer}>
        <Toast 
          visible={showFavoriteToast}
          position={'bottom'}
          backgroundColor={'black'}
          message='Favorited!'
          autoDismiss={1500}
          onDismiss={() => setShowFavoriteToast(false)}
        />
        <Toast 
          visible={showUnfavoriteToast}
          position={'bottom'}
          backgroundColor={'black'}
          message='Unfavorited!'
          autoDismiss={1500}
          onDismiss={() => setShowUnfavoriteToast(false)}
        />
        <View
          style={styles.topRow}>
          <Text
            style={{fontFamily: 'poppins-semibold', fontSize: 16, marginLeft: 10}}>
            {mode === 'day1' ? 'Showing Day 1' : mode === 'day2' ? 'Showing Day 2' : 'Showing Favorites'}
          </Text>
          <Button
            style={{marginRight: 10}}
            size="small"
            label={'Filter'}
            labelStyle={{fontFamily: 'poppins-light'}}
            onPress={() => setPickerVisible(true)}
          />
          <ActionSheet
            visible={pickerVisible}
            title='Filter by...'
            cancelButtonIndex={3}
            options={[
              {label: 'Day 1', onPress: () => filterList('day1')},
              {label: 'Day 2', onPress: () => filterList('day2')},
              {label: 'Favorites', onPress: () => filterList('favorites')}
            ]}
            onDismiss={() => setPickerVisible(false)}
          >
          </ActionSheet>
        </View>
        <FlatList
          data={events}
          renderItem={renderItem}
          key={events}
          keyExtractor={keyExtractor}
        />
      </SafeAreaView>
  )
}

ScheduleScreen.navigationOptions = {
  headerTitle: 'Schedule',
  headerTitleStyle: {
    fontFamily: 'poppins-light',
    letterSpacing: 1
  }
}

export default ScheduleScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flex: 1
  },
  container: {
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
  topRow: {
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#CFD8DC', 
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10
  }
})

