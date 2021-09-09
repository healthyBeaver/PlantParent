import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GardenStack from "./GardenStack";
import SearchArea from "../screens/SearchArea";
import ProfileStack from "./ProfileStack";
import Ionicons from "react-native-vector-icons/Ionicons";
import CalendarScreen from "../screens/CalendarArea";

const Tab = createBottomTabNavigator();
export default class TabNavigation extends React.Component {
  userID = this.props.route.params.userID;
  name = this.props.route.params.name;
  email = this.props.route.params.email;
  render() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "My Garden") {
              iconName = focused ? "ios-leaf" : "ios-leaf";
            } else if (route.name === "Search Plants") {
              iconName = focused ? "search-outline" : "search-sharp";
            } else if (route.name === "Calendar") {
              iconName = focused ? "calendar" : "calendar-sharp";
            } else if (route.name === "Setting") {
              iconName = focused ? "settings-outline" : "settings";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={20} />;
          },
        })}
      >
        <Tab.Screen
          options={{ unmountOnBlur: true }}
          name="My Garden"
          children={() => <GardenStack userID={this.userID} />}
        />
        <Tab.Screen
          name="Search Plants"
          children={() => <SearchArea userID={this.userID} />}
        />
        <Tab.Screen
          name="Setting"
          children={() => <ProfileStack userID={this.userID} />}
        />
      </Tab.Navigator>
    );
  }
}
