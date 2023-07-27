import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Direction } from "../types/types";
import Snake from "./Snake";
import { checkGameOver } from "../utils/checkGameOver";
import Food from "./Food";
import { Colors } from "../styles/colors";

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 0, yMax: 72 };
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

const Game = () => {
  const [diection, setDirection] = useState(Direction.Right);
  const [snake, setSnake] = useState(SNAKE_INITIAL_POSITION);
  const [food, setFood] = useState(FOOD_INITIAL_POSITION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleGesture = (event: any) => {
    const { translationX, translationY } = event.nativeEvent;

    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        // Moving right
        setDirection(Direction.Right);
      } else {
        // Moving left
        setDirection(Direction.Left);
      }
    } else {
      if (translationY > 0) {
        // Moving down
        setDirection(Direction.Down);
      } else {
        // Moving up
        setDirection(Direction.Up);
      }
    }
  };

  useEffect(() => {
    if (!isGameOver) {
      const intervalId = setInterval(() => {
        !isPaused && moveSnake();
      }, MOVE_INTERVAL);

      return () => clearInterval(intervalId);
    }
  }, [snake, isGameOver, isPaused]);

  const moveSnake = () => {
    const snakeHead = snake[0];
    const newHead = { ...snakeHead }; //creating a copy

    if (checkGameOver(snakeHead, GAME_BOUNDS)) {
      setIsGameOver((prev) => !prev);
      return;
    }

    switch (diection) {
      case Direction.Up:
        newHead.y -= 1;
        break;

      case Direction.Down:
        newHead.y += 1;
        break;

      case Direction.Left:
        newHead.x -= 1;
        break;

      case Direction.Right:
        newHead.x += 1;
        break;
      default:
        break;
    }

    setSnake([newHead, ...snake.slice(0, -1)]);
  };

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <SafeAreaView style={styles.container}>
        <View style={{}}></View>
        <View style={styles.boundaries}>
          <Snake snake={snake} />
          <Food x={food.x} y={food.y} />
        </View>
      </SafeAreaView>
    </PanGestureHandler>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  boundaries: {
    flex: 1,
    width: 390,
    height: 100,
    backgroundColor: Colors.background,
    borderWidth: 12,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderColor: Colors.primary,
  },
});
