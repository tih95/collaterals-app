import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { View, Text, Image } from "react-native-ui-lib";
import Grid from "react-native-grid-component";

let imageUrls = [
  { url: require("../../assets/img/ninds_logo.png") },
  { url: require("../../assets/img/eso_logo.jpg") },
  { url: require("../../assets/img/menasino_logo.jpeg") },
  { url: require("../../assets/img/KSS_logo.png") },
  { url: require("../../assets/img/ncs_logo.png") },
  { url: require("../../assets/img/snis_logo.png") },
  { url: require("../../assets/img/wso_logo.jpg") },
  { url: require("../../assets/img/svin_logo.png") },
  { url: require("../../assets/img/asn_logo.jpeg") }
];


const EndorsementsScreen = () => {
   const renderItem = data => <Image key={data.url} source={data.url} style={styles.item} />;

   const renderPlaceholder = () => <View style={styles.item} />;
 
   return (
      <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
         Thank you to these organizations for your endorsements!
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

EndorsementsScreen.navigationOptions = {
  headerTitle: 'Endorsements',
  headerTitleStyle: {
    fontFamily: 'poppins-light',
    letterSpacing: 1
  }
}

const styles = StyleSheet.create({
   container: {
     flex: 1
   },
   title: {
     fontSize: 30,
     textAlign: "center",
     fontFamily: 'poppins-light',
     marginBottom: 20,
     marginTop: 20
   },
   item: {
     flex: 1,
     margin: 30,
     alignSelf: "center"
   },
   list: {
     flex: 1
   }
})

export default EndorsementsScreen;