import React, { Component } from "react";
import { ScrollView } from "react-native";
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";

export default class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      preferred_name: "",
      email: "",
    };
  }

  async createAccount() {
    console.log("here");
    await fetch("https://plantparent506.herokuapp.com/users/createAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        preferred_name: this.state.preferred_name,
        email: this.state.email,
      }),
    }).then(async (res) => {
      let response = await res.json();
      if (response == "Too short") {
        window.alert(
          "Your username is too short! It needs be at least 8 characters long"
        );
      } else if (response == "Duplicate") {
        window.alert("This username already exists. Try another one!");
      } else {
        window.alert("Signed up successfully!");
        //this.props.navigation.navigate("Login");
      }
    });
  }
  checkFields() {
    if (
      this.username == "" ||
      this.password == "" ||
      this.state.preferred_name == "" ||
      this.email == ""
    ) {
      window.alert("All feilds must be filled!");
    } else if (this.state.password.length < 8) {
      window.alert("Password should be at least 8 characters long!");
    } else {
      this.createAccount();
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.accountLink}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text style={{ color: "#5e85bd" }}>Back to Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("./../Images/PlantParent.png")}
          />
        </View>
        <View style={styles.formContainer}>
          <View style={styles.container2}>
            <Text style={styles.fieldsLabel}>Username</Text>
            <TextInput
              placeholder="Enter your username"
              placeholderTextColor="rgba(29, 53, 87, .7)"
              style={styles.input}
              onChangeText={(text) => {
                this.setState({ username: text });
              }}
            />
            <Text style={styles.fieldsLabel}> Password</Text>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor="rgba(29, 53, 87, .7)"
              secureTextEntry
              style={styles.input}
              onChangeText={(text) => {
                this.setState({ password: text });
              }}
            />
            <Text style={styles.fieldsLabel}> Name</Text>
            <TextInput
              placeholder="Enter your preferred name"
              placeholderTextColor="rgba(29, 53, 87, .7)"
              style={styles.input}
              onChangeText={(text) => {
                this.setState({ preferred_name: text });
              }}
            />
            <Text style={styles.fieldsLabel}> Email</Text>
            <TextInput
              placeholder="Enter email"
              placeholderTextColor="rgba(29, 53, 87, .7)"
              style={styles.input}
              onChangeText={(text) => {
                this.setState({ email: text });
              }}
            />

            <TouchableOpacity style={styles.buttonContainer}>
              <Text
                testID="button1"
                style={styles.buttonText}
                onPress={() => this.checkFields()}
              >
                Create Account
              </Text>
            </TouchableOpacity>
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
    marginTop: 40,
  },
  container2: {
    padding: 20,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30,
  },
  logo: {
    flex: 1,
    width: 200,
    height: 100,
    resizeMode: "contain",
    alignItems: "center",
  },
  title: {
    color: "#1d3557",
    marginBottom: 10,
    marginTop: 30,
    marginLeft: 100,
    textAlign: "center",
    width: 200,

    justifyContent: "center",
    opacity: 0.9,
    fontSize: 30,
  },
  fieldsLabel: {
    paddingBottom: 10,
  },
  input: {
    height: 50,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#30694B",
    marginBottom: 20,
    color: "#383838",
    paddingHorizontal: 10,
  },
  buttonContainer: {
    alignItems: "center",
    padding: 5,
    marginBottom: 10,
    borderRadius: 10,
    // Plant Color
    backgroundColor: "#30694B",
  },
  buttonText: {
    borderColor: "white",
    fontSize: 15,
    color: "white",
    padding: 10,
    borderRadius: 20,
  },
});
