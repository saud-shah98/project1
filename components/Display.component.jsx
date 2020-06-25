import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";
import { View, StyleSheet, Text } from "react-native";

export const Display = ({ time }) => {
  return (
    <View style={styles.display}>
      <Text style={styles.timeText}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  display: {
    backgroundColor: "black",
    flex: 1,
    justifyContent: "center",
  },
  timeText: {
    color: "whitesmoke",
    fontSize: 42,
    textAlign: "center",
  },
});
