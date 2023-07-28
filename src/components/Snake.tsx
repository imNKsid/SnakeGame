import { StyleSheet, View } from "react-native";
import React, { Fragment } from "react";
import { Coordinate } from "../types/types";
import { Colors } from "../styles/colors";

interface SnakeProps {
  snake: Coordinate[]; //snake prop is an array of 'Coordinate' objects x & y.
}
const Snake = ({ snake }: SnakeProps) => {
  return (
    <Fragment>
      {/* Fragment is similar to <> </> */}
      {snake.map((segment: Coordinate, index: number) => {
        //Here, 'segment' is a Snake's part, more like item of an array
        const segmentStyle = {
          left: segment.x * 10,
          top: segment.y * 10,
        };
        return <View key={index} style={[styles.snakeStyle, segmentStyle]} />;
        //Rendering a series of view each representing a part/segment of Snake's body
        //As the snake moves, the component is re-rendered with updated coordinates, effectively
        //animating the movement of the snake.
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
