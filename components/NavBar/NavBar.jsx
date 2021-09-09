import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class AmaryllisInfo extends Component {
    render() {
        return (
            <View style={styles.container}>

                <View style={styles.flexbox}>
                    <View style={styles.logoContainer}>
                        <View style={styles.icon}>
                            <Ionicons name="leaf-outline" size={35} color="#51A746" />
                        </View>
                        <View style={styles.icon}>
                            <Ionicons name="search-outline" size={35} color="#51A746" />
                        </View>
                        <View style={styles.icon}>
                            <Ionicons name="calendar-outline" size={35} color="#51A746" />
                        </View>
                        <View style={styles.icon}>
                            <Ionicons name="person-outline" size={35} color="#51A746" />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "gray",
        flexDirection: "column",
    },
    logoContainer: {
        flex: 1,
        flexDirection: "row",
        alignSelf: "center",
    },
    icon: {
        borderWidth: 0,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        width: 70,
        height: 70,
        borderRadius: 50,
    },
    flexbox: {
        justifyContent: "space-between",
    }
});