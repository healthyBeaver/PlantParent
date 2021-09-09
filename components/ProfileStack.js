import { StatusBar } from "expo-status-bar";
import React from "react";
import { render } from "react-dom";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ProfileScreen from "../screens/Profile";
import Login from "../screens/Login";

const Stack = createStackNavigator();
export default class App extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{ unmountOnBlur: true }}
          name="Setting"
          component={ProfileScreen}
          initialParams={{
            userID: this.props.userID,
            name: this.props.name,
            email: this.props.email,
          }}
        />
      </Stack.Navigator>
    );
  }
}
