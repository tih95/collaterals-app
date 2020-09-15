import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text, Image, ListItem } from 'react-native-ui-lib';

import Flags from '../Flags';

const SpeakerList = (props) => {

   moveToSpeakerPage = (speaker) => {
      props.navigation.navigate('Speaker', {speaker: speaker});
    }

   keyExtractor = (item) => item.name;
 
   renderItem = ({item}) => {
     let icon = Flags[item.country];
 
     return(
        <TouchableOpacity onPress={() => moveToSpeakerPage(item)}>
          <View style={styles.listItem}>
            <Image 
              source={icon}
              style={styles.image}  
            />
            <View>
              <Text style={{fontFamily: 'poppins-medium'}}>
                {item.name}
              </Text>
              <Text style={{fontFamily: 'poppins-italic'}}>{item.country}</Text>
            </View>
            <View style={{flex: 2}}>
              <Text style={{fontFamily: 'poppins-thin', textAlign: 'right'}}>
                {item.location}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
     )
   }
    
   return (
      <View style={styles.speakerListContainer}>
        <FlatList
          data={props.data}
          extraData={props.data[0]}
          key={props.data}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
   )
}

const styles = StyleSheet.create({
   text: {
      color: 'white'
    },
    speakerListContainer: {
      flex: 1,
      backgroundColor: 'white',
    },
    image: {
      height: 35,
      width: 35,
      marginRight: 10,
      alignSelf: 'center',
    },
    listItemLeft: {
      flexDirection: 'row',
      
    },
    listItem: {
      backgroundColor: 'white',
      flexDirection: 'row',
      padding: 15
    }
 })

export default SpeakerList;