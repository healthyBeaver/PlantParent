import React, { Component } from "react";
//import { CalendarList } from "react-native-calendars";
import { StyleSheet, View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class CalendarScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Calendar Screen</Text>
        <CalendarList
          onVisibleMonthsChange={(months) => {
            console.log("new month", months);
          }}
          horizontal={true}
          pagingEnabled={true}
          calendarWidth={320}
          // pastScrollRange={0}
          // futureScrollRange={0}
          // scrollEnabled={true}
          // showScrollIndicator={true}
        />
        <View style={styles.optionWrapper}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="ellipse-outline" size={20} color="#51A746" />
            <Text style={{ fontSize: 20, paddingLeft: 10 }}>
              Snake plant needs to be watered.
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="ellipse-outline" size={20} color="#51A746" />
            <Text style={{ fontSize: 20, paddingLeft: 10 }}>
              Check the soil for snake plant.
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="ellipse-outline" size={20} color="#51A746" />
            <Text style={{ fontSize: 20, paddingLeft: 10 }}>Task details.</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 20,
  },
  subtext: {
    fontSize: 5,
    paddingLeft: 10,
  },
  textWrapper: {
    flex: 1,
    justifyContent: "flex-start",
  },
  optionWrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
});
