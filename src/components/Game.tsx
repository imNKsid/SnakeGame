import { View, Text, SafeAreaView, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Direction } from "../types/types";
import Snake from "./Snake";
import { checkGameOver } from "../utils/checkGameOver";
import Food from "./Food";
import { Colors } from "../styles/colors";
import { checkEatsFood } from "../utils/checkEatsFood";
import { randomFoodPosition } from "../utils/randomFoodPosition";
import Header from "./Header";

const { height, width } = Dimensions.get("window");

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 0, yMax: width * 0.165 };
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

const Game = () => {
  const [diection, setDirection] = useState(Direction.Right);
  const [snake, setSnake] = useState(SNAKE_INITIAL_POSITION);
  const [food, setFood] = useState(FOOD_INITIAL_POSITION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);

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

    if (checkEatsFood(newHead, food, 2)) {
      setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax)); //set another food's position
      setSnake([newHead, ...snake]); //making the snake longer
      setScore(score + SCORE_INCREMENT); //increasing the score
    } else {
      setSnake([newHead, ...snake.slice(0, -1)]);
    }
  };

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

  const pauseGame = () => {
    setIsPaused(!isPaused);
  };

  const reloadGame = () => {
    setSnake(SNAKE_INITIAL_POSITION);
    setFood(FOOD_INITIAL_POSITION);
    setIsGameOver(false);
    setScore(0);
    setDirection(Direction.Right);
    setIsPaused(false);
  };

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <SafeAreaView style={styles.container}>
        <Header
          isPaused={isPaused}
          pauseGame={pauseGame}
          reloadGame={reloadGame}
        >
          <Text style={styles.scoreStyle}>{score}</Text>
        </Header>
        <View style={styles.boundaries}>
          <Snake snake={snake} />
          <Food x={food.x} y={food.y} />
          {isGameOver ? (
            <View style={styles.gameOverStyle}>
              <Text style={styles.scoreStyle}>Game Over!</Text>
            </View>
          ) : null}
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
    flex: 0.95,
    width: width,
    // height: 100,
    backgroundColor: Colors.background,
    borderWidth: 12,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderColor: Colors.primary,
  },
  scoreStyle: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primary,
  },
  gameOverStyle: {
    flex: 0.95,
    justifyContent: "center",
    alignItems: "center",
  },
});