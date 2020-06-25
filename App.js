import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Timer from "./Timer";

export default class App extends Component {
  render() {
    return <Timer />;
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
