import { StatusBar } from "expo-status-bar";
import React from "react";
import { render } from "react-dom";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import GardenArea from "../screens/GardenArea";
import Plant from "../screens/plant";

const Stack = createStackNavigator();
export default class App extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{ unmountOnBlur: true, title: 'Garden'}}
          name="GardenView"
          component={GardenArea}
          initialParams={{ userID: this.props.userID }}
        />
        <Stack.Screen
          name="Plant"
          options={{title: 'Plant'}}
          component={Plant}
          initialParams={{ userID: this.props.userID }}
        />
      </Stack.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
