import React from 'react';
import { SafeAreaView, StyleSheet } from "react-native";
import { View, Text, Image } from "react-native-ui-lib";
import Grid from "react-native-grid-component";

let imageUrls = [
   { url: require("../../assets/img/stryker_logo.png") },
   { url: require("../../assets/img/medtronic_logo.png") },
   { url: require("../../assets/img/cerenovus-logo.png") },
   { url: require("../../assets/img/NeuroVasc_logo.png") },
   { url: require("../../assets/img/siemens.png") },
   { url: require("../../assets/img/vassol.jpeg") },
   { url: require("../../assets/img/genentech.png") },
   { url: require("../../assets/img/burl.png") }
 ];

const SponsorsScreen = (props) => {

   const renderItem = data => <Image key={data.url} source={data.url} style={styles.item} />;

   const renderPlaceholder = () => <View style={styles.item} />;

   return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
          Thank you to our Collaterals 2019 sponsors!
        </Text>
        <Grid
          renderItem={renderItem}
          renderPlaceholder={renderPlaceholder}
          style={styles.list}
          data={imageUrls}
          numColumns={1}
        />
      </SafeAreaView>
   );
}

SponsorsScreen.navigationOptions = {
   headerTitle: 'Sponsors',
   headerTitleStyle: {
     fontFamily: 'poppins-light',
     letterSpacing: 1
   }
}

const styles = StyleSheet.create({
   container: {
     flex: 1,
     padding: 5
   },
   title: {
     fontSize: 30,
     textAlign: "center",
     marginBottom: 20,
     marginTop: 20,
     fontFamily: 'poppins-light'
   },
   item: {
     flex: 1,
     margin: 30,
     alignSelf: "center"
   },
   list: {
     flex: 1
   }
 });

export default SponsorsScreen;