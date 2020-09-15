import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { ActionSheet, Button, View, Text } from 'react-native-ui-lib';

import SpeakerList from '../components/SpeakerList';

import * as data from '../data.json';

const SpeakersScreen = (props) => {
   const [speakers, setSpeakers] = useState([]);
   const [pickerVisible, setPickerVisible] = useState(false);
   const [sortMode, setSortMode] = useState('country');

   useEffect(() => {
      let speakerArr = [];

      speakerArr = data.speakers;
  
      // sort by country
      speakerArr.sort((a, b) => {
        let aVar = a.country.toLowerCase();
        let bVar = b.country.toLowerCase();
  
        if (aVar > bVar) {
          return 1;
        }
        else if (aVar < bVar) {
          return -1;
        }
        else {
          return 0;
        }
      })
      setSpeakers(speakerArr);
   }, [])

   const sortByMode = (mode) => {
      let speakerArr = [];
      speakerArr = data.speakers;

      if (mode === 'name') {
         speakerArr.sort((a, b) => {
            let aVar = a.name.toLowerCase();
            let bVar = b.name.toLowerCase();
      
            if (aVar > bVar) {
               return 1;
            }
            else if (aVar < bVar) {
               return -1;
            }
            else {
               return 0;
            }
         })
      }
      else if (mode === 'country') {
         speakerArr.sort((a, b) => {
            let aVar = a.country.toLowerCase();
            let bVar = b.country.toLowerCase();
      
            if (aVar > bVar) {
               return 1;
            }
            else if (aVar < bVar) {
               return -1;
            }
            else {
               return 0;
            }
         })
      }
      setSpeakers(speakerArr);
      setSortMode(mode);
   }

   return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topRow}>
          <Text
            style={{fontSize: 16, marginLeft: 10, fontFamily: 'poppins-semibold'}}>
            {sortMode === 'country' ? 'Sorting by country' : 'Sorting by name'}
          </Text>
          <Button
            style={{marginRight: 10}}
            size="small"
            label={'Sort By'}
            labelStyle={{fontFamily: 'poppins-light', letterSpacing: 1}}
            onPress={() => setPickerVisible(true)}
          />
          <ActionSheet
            visible={pickerVisible}
            title='Sort by...'
            cancelButtonIndex={3}
            options={[
              {label: 'Name', onPress: () => sortByMode('name')},
              {label: 'Country', onPress: () => sortByMode('country')},
              {label: 'Cancel', onPress: () => this.onDismiss},
            ]}
            onDismiss={() => setPickerVisible(false)}
          >
          </ActionSheet>
        </View>
        <SpeakerList data={speakers} navigation={props.navigation}/>
      </SafeAreaView>
   )
}

SpeakersScreen.navigationOptions = {
   headerTitle: 'Speakers',
   headerTitleStyle: {
      fontFamily: 'poppins-light',
      letterSpacing: 1
   }
}

export default SpeakersScreen;

const styles = StyleSheet.create({
   container: {
     backgroundColor: 'white',
     flex: 1
   },
   text: {
     color: 'white',
     fontSize: 25,
     textAlign: 'center',
     fontWeight: '100',
     paddingLeft: 5
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

