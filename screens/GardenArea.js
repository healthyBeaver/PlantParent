import react from "react";
import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { ScrollView, FlatList } from "react-native";
import { Card } from "react-native-elements";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";

export default class GardenArea extends React.Component {
  userID = this.props.route.params.userID;
  state = {
    plants: [],
    userPlants: [],
    clickedPlantIndex: undefined,
  };

  async componentDidMount() {
    await fetch(
      "https://plantparent506.herokuapp.com/gardens/get/" + this.userID,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (res) => await res.json())
      .then(async (res) => {
        //I have the result of the garden get: array of userPlant IDs. Now I have to iterate through this
        //and call the userPlants get to get the full object, and put that into my state

        //If I dont have any plants saved
        if (res == "Empty!") {
          throw new Error("Empty!");
        } else {
          let userPlants = [];
          for (let userPlantID of res) {
            await fetch(
              "https://plantparent506.herokuapp.com/userPlants/getPlant/" +
                userPlantID,
              {
                method: "GET",
                header: {
                  "Content-Type": "application/json",
                },
              }
            )
              .then(async (result) => {
                return await result.json();
              })
              .then((result) => {
                userPlants.push(result);
              })
              .catch((err) => console.log("Error: " + err));
          }
          this.setState({ userPlants: userPlants });
        }
      })
      .then(async () => {
        //I have all the userPlants in the state. Now I need to do the same thing I did before, except with
        //userPlants and plants

        let plants = [];
        for (let plant of this.state.userPlants) {
          await fetch(
            "https://plantparent506.herokuapp.com/plants/getPlant/" +
              plant.plantID,
            {
              method: "GET",
              header: {
                "Content-Type": "application/json",
              },
            }
          )
            .then(async (result) => {
              return await result.json();
            })
            .then((result) => {
              plants.push(result);
            })
            .catch((err) => console.log("Error: " + err));
        }
        this.setState({ plants: plants });
      })
      .catch((err) => {
        if (err != "Empty") {
          console.log("Error: " + err);
        }
      });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.state.plants.length > 0 && (
          <FlatList
            data={this.state.userPlants}
            numColumns={2}
            style={styles.grid}
            keyExtractor={(item, index) => item._id}
            renderItem={({ item, index }) => (
              <View style={styles.gridContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("Plant", {
                      userPlant: this.state.userPlants[index],
                      plant: this.state.plants[index],
                    });
                  }}
                >
                  <View style={styles.card}>
                    <Image
                      style={styles.plantImage}
                      source={{ uri: this.state.plants[index].image }}
                    ></Image>
                    <Text style={styles.plantName}>{item.givenName}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
        {!this.state.plants.length && (
          <Text style={styles.emptyGarden}>
            Your garden is currently empty
          </Text>
          // images appears if garden is empty
          // <Image style = {styles.emptyImage}source={require('./../Images/yard.svg')} />

        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
  },
  emptyGarden:{
    fontSize: 27,
    fontFamily:"Helvetica",
    paddingTop: 190,
    marginLeft: 80,
    marginRight: 80,
    textAlign: "center",
    color: "#828282",
    justifyContent: "center",
    alignItems:"center",
  },
  emptyImage:{
    width: 100,
  },
  gridContainer: {
    paddingTop: 10,
  },
  card: {
    padding: 15,
  },
  plantName: {
    paddingTop: 10,
    fontSize: 16,
    color: "#515151",
  },
  title: {
    color: "gray",
    marginBottom: 10,
    marginTop: 40,
    textAlign: "left",
    width: 200,
    justifyContent: "center",
    opacity: 0.9,
    fontSize: 22,
  },

  plantImage: {
    flex: 1,
    height: 180,
    width: 150,
    borderRadius: 10,
  },
});
