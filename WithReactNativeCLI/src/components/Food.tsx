import { StyleSheet, Text } from "react-native";
import React from "react";
import { Coordinate } from "../types/types";

const Food = ({ x, y }: Coordinate) => {
  return (
    <Text style={[{ top: y * 10, left: x * 10 }, styles.foodStyle]}>🍎</Text>
  );
};

export default Food;

const styles = StyleSheet.create({
  foodStyle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: "absolute",
  },
});
