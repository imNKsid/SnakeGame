import { StyleSheet, View } from "react-native";
import React, { Fragment } from "react";
import { Coordinate } from "../types/types";
import { Colors } from "../styles/colors";

interface SnakeProps {
  snake: Coordinate[];
}
const Snake = ({ snake }: SnakeProps) => {
  return (
    <Fragment>
      {/* Fragment is similar to <> </> */}
      {snake.map((segment: Coordinate, index: number) => {
        const segmentStyle = {
          left: segment.x * 10,
          top: segment.y * 10,
        };
        return <View key={index} style={[styles.snakeStyle, segmentStyle]} />;
      })}
    </Fragment>
  );
};

export default Snake;

const styles = StyleSheet.create({
  snakeStyle: {
    width: 15,
    height: 15,
    borderRadius: 7,
    backgroundColor: Colors.primary,
    position: "absolute",
  },
});
