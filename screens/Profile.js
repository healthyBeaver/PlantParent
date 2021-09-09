import React, { Component } from "react";
import { Modal } from "react-native";
import { Button } from "react-native";
import { View, SafeAreaView, StyleSheet, TextInput } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";

import Ionicons from "react-native-vector-icons/Ionicons";

export default class ProfileScreen extends Component {
  userID = this.props.route.params.userID;
  // name = this.props.route.params.name;
  //email = this.props.route.params.email;
  state = {
    modalVisible1: false,
    modalVisible2: false,
    modalVisible3: false,
    username: "",
    password: "",
    confirmedUsername: "",
    confirmedPassword: "",
    name: "",
  };

  // fetches the server and deleted the account
  async deleteAccount() {
    await fetch("https://plantparent506.herokuapp.com/users/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: this.userID,
      }),
    })
      .then(() => {
        window.alert("The account has been deleted.");
        this.props.navigation.navigate("Login");
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  }
  async getNameEmail() {
    console.log(this.props.route.params.userID);
    await fetch("https://plantparent506.herokuapp.com/users/getNameEmail", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: this.props.route.params.userID,
      }),
    })
      .then(async (res) => {
        let response = await res.json();
        console.log(res.status);
        if (res.status == 400) {
          window.alert("Something wrong!");
        } else {
          this.setState({ name: response });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async updateUsername() {
    await fetch("https://plantparent506.herokuapp.com/users/updateUsername", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: this.props.route.params.userID,
        username: this.state.confirmedUsername,
      }),
    })
      .then(() => {})
      .catch((err) => {
        console.log("Error: " + err);
      });
  }

  async updatePassword() {
    await fetch("https://plantparent506.herokuapp.com/users/updatePassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: this.props.route.params.userID,
        password: this.state.confirmedPassword,
      }),
    })
      .then(() => {
        this.props.navigation.navigate("Login");
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  }

  handleUsername = (text) => {
    this.setState({ username: text });
  };

  handleConfirmedUsername = (text) => {
    this.setState({ confirmedUsername: text });
  };

  handlePassword = (text) => {
    this.setState({ password: text });
  };

  handleConfirmedPassword = (text) => {
    this.setState({ confirmedPassword: text });
  };

  checkIfEqual1() {
    if (this.state.username.length < 8) {
      this.state.username = "";
      this.state.confirmedUsername = "";
      window.alert(
        "New user name is too short. It must be at least 8 characters."
      );
    } else if (this.state.username === "") {
      this.state.confirmedUsername = "";
      window.alert("Type in the new user name you prefer!");
    } else if (this.state.confirmedUsername === "") {
      this.state.username = "";
      window.alert("Please confirm the new user name!");
    } else {
      if (this.state.username === this.state.confirmedUsername) {
        // POST to database
        this.updateUsername();
        //this.getNameEmail();
        window.alert("New user name is updated.");
      } else {
        this.state.username = "";
        this.state.confirmedUsername = "";
        window.alert("Confirming new user name failed.");
      }
    }
  }

  checkIfEqual2() {
    if (this.state.password.length < 8) {
      this.state.password = "";
      this.state.confirmedPassword = "";
      window.alert(
        "New password is too short. It must be at least 8 characters."
      );
    } else if (this.state.password === "") {
      this.state.confirmedPassword = "";
      window.alert("Type in the new password!");
    } else if (this.state.confirmedPassword === "") {
      this.state.password = "";
      window.alert("Please confirm the password!");
    } else {
      if (this.state.password === this.state.confirmedPassword) {
        // POST to database
        this.updatePassword();
        window.alert("New password is updated. Redirected to Login screen.");
      } else {
        this.state.password = "";
        this.state.confirmedPassword = "";
        window.alert("Confirming new password failed.");
      }
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.settingWrapper}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible1}
          >
            <View style={styles.changeInfo}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}> Change Username </Text>
                <Text style={styles.textInputLabel}> Username </Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="New username"
                  placeholderTextColor="#b5b5b5"
                  autoCapitalize="none"
                  onChangeText={this.handleUsername}
                />
                <Text style={styles.textInputLabel}> Confirm username</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Confirm username"
                  placeholderTextColor="#b5b5b5"
                  autoCapitalize="none"
                  onChangeText={this.handleConfirmedUsername}
                />
                <Button
                  title="Save"
                  onPress={() => {
                    this.setState({ modalVisible1: false }),
                      this.checkIfEqual1();
                  }}
                />
                <Button
                  title="Cancel"
                  onPress={() => this.setState({ modalVisible1: false })}
                />
              </View>
            </View>
          </Modal>

          <TouchableRipple
            onPress={() => {
              this.setState({ modalVisible1: true });
            }}
          >
            <View style={styles.settingItem}>
              <Ionicons name="settings-outline" color="#FF6347" size={25} />
              <Text style={styles.settingItemText}>Change Username</Text>
            </View>
          </TouchableRipple>

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible2}
          >
            <View style={styles.changeInfo}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}> Change Password </Text>
                <Text style={styles.textInputLabel}> New Password </Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="New Password"
                  secureTextEntry
                  placeholderTextColor="#b5b5b5"
                  autoCapitalize="none"
                  onChangeText={this.handlePassword}
                />
                <Text style={styles.textInputLabel}> Password </Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Confirm New Password"
                  secureTextEntry
                  placeholderTextColor="#b5b5b5"
                  autoCapitalize="none"
                  onChangeText={this.handleConfirmedPassword}
                />
                <Button
                  title="Save"
                  onPress={() => {
                    this.setState({ modalVisible2: false }),
                      this.checkIfEqual2();
                  }}
                />
                <Button
                  title="Cancel"
                  onPress={() => this.setState({ modalVisible2: false })}
                />
              </View>
            </View>
          </Modal>
          <TouchableRipple
            onPress={() => {
              this.setState({ modalVisible2: true });
            }}
          >
            <View style={styles.settingItem}>
              <Ionicons name="lock-closed-outline" color="#FF6347" size={25} />
              <Text style={styles.settingItemText}>Change Password</Text>
            </View>
          </TouchableRipple>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible3}
          >
            <View style={styles.changeInfo}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>
                  {" "}
                  Do you really want to delete your acccount?{" "}
                </Text>
                <Button
                  title="Yes"
                  onPress={() => {
                    this.setState({ modalVisible3: false }),
                      this.deleteAccount();
                  }}
                />
                <Button
                  title="Cancel"
                  onPress={() => this.setState({ modalVisible3: false })}
                />
              </View>
            </View>
          </Modal>
          <TouchableRipple
            onPress={() => {
              this.setState({ modalVisible3: true });
            }}
          >
            <View style={styles.settingItem}>
              <Ionicons name="trash-outline" color="#FF6347" size={25} />
              <Text style={styles.settingItemText}>Delete Account</Text>
            </View>
          </TouchableRipple>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginTop: 10,
  },
  infoBoxWrapper: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  settingItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  settingItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  input: {
    height: 50,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#b5b5b5",
    marginBottom: 20,
    color: "#383838",
    paddingHorizontal: 10,
  },
  modalButton: {
    backgroundColor: "white",
    color: "black",
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
  },
  changeInfo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 15,
    padding: 25,
    alignItems: "flex-start",
  },
  modalTitle: {
    fontSize: 20,
    paddingBottom: 20,
    fontWeight: "bold",
  },
  textInput: {
    width: 280,
    height: 40,
    backgroundColor: "white",
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: "#b5b5b5",
    marginBottom: 20,
    color: "#383838",
    paddingHorizontal: 10,
  },
  textInputLabel: {
    paddingBottom: 10,
  },
  changeInfo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});
