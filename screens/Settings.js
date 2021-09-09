import React, { Component } from "react";
import { StyleSheet, View, SafeAreaView, Text } from "react-native";

export default class Settings extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.nameWrapper}>
          <Text style={styles.name}>Jessica</Text>
        </View>

        <View style={styles.settingsWrapper}>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Hello World!</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
  },
  name: {
    fontSize: 25,
  },
  nameWrapper: {
    paddingTop: 30,
  },
  settingsWrapper: {
    paddingTop: 50,
  },

  settingText: {
    fontSize: 15,
  },

  settingsWrapper: {
    borderWidth: 1,
    borderTopColor: "black",
    borderBottomColor: "black",
  },
});
