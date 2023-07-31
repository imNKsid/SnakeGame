import {View, Text, SafeAreaView, StyleSheet, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PanGestureHandler} from 'react-native-gesture-handler'; //PanGestureHandler is used for handling pan gestures (swipes)
import {Direction} from '../types/types';
import Snake from './Snake';
import {checkGameOver} from '../utils/checkGameOver';
import Food from './Food';
import {Colors} from '../styles/colors';
import {checkEatsFood} from '../utils/checkEatsFood';
import {randomFoodPosition} from '../utils/randomFoodPosition';
import Header from './Header';

const {height, width} = Dimensions.get('window');

const SNAKE_INITIAL_POSITION = [{x: 5, y: 5}];
const FOOD_INITIAL_POSITION = {
  x: Math.floor(Math.random() * width * 0.09),
  y: 20,
};
const GAME_BOUNDS = {
  xMin: 0,
  xMax: width * 0.09,
  yMin: 0,
  yMax: height * 0.077,
}; //defining the game boundaries

const MOVE_INTERVAL = 50; //constant value for controlling the Snake's speed
const SCORE_INCREMENT = 10;

const Game = () => {
  const [direction, setDirection] = useState(Direction.Right);
  const [snake, setSnake] = useState(SNAKE_INITIAL_POSITION);
  const [food, setFood] = useState(FOOD_INITIAL_POSITION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    //if game isn't over
    if (!isGameOver) {
      const intervalId = setInterval(() => {
        !isPaused && moveSnake(); //if game isn't paused, move the snake by MOVE_INTERVAL
      }, MOVE_INTERVAL);

      return () => clearInterval(intervalId);
    }
  }, [snake, isGameOver, isPaused]);

  const moveSnake = () => {
    const snakeHead = snake[0];
    const newHead = {...snakeHead}; //creating a copy of the snake's head position
    //Here, the newHead is used to simulate the movement of the snake's head without directly
    //modifying the original snakeHead variable.

    //Check if the game is over due to collision with boundaries
    if (checkGameOver(snakeHead, GAME_BOUNDS)) {
      setIsGameOver(prev => !prev);
      return; // Exit the function if the game is over
    }

    // Move the snake in the current direction based on the `direction` state
    switch (direction) {
      case Direction.Up:
        newHead.y -= 1; // Move up by reducing the y-coordinate
        break;

      case Direction.Down:
        newHead.y += 1; // Move down by increasing the y-coordinate
        break;

      case Direction.Left:
        newHead.x -= 1; // Move left by reducing the x-coordinate
        break;

      case Direction.Right:
        newHead.x += 1; // Move right by increasing the x-coordinate
        break;
      default:
        break;
    }

    // Check if the snake eats the food (within an area of 2 units) -Here, 2 units is the apple's area
    if (checkEatsFood(newHead, food, 2)) {
      setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax)); //set another food's position
      setSnake([newHead, ...snake]); //making the snake longer
      setScore(score + SCORE_INCREMENT); //increasing the score by SCORE_INCREMENT
    } else {
      // If the snake didn't eat the food, move the snake forward
      setSnake([newHead, ...snake.slice(0, -1)]);
      // slice(0, -1) removes the last element from the snake array, effectively moving it forward.

      //Here, we're adding the newHead to the snake variable while removing the snake's previous value.
      //This makes the snake to be of same length while moving forward.
    }
  };

  const handleGesture = (event: any) => {
    const {translationX, translationY} = event.nativeEvent;

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
    //setting everything back to initial position
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
          reloadGame={reloadGame}>
          <Text
            style={[
              styles.scoreStyle,
              {fontSize: score.toString().length > 5 ? 18 : 22},
            ]}>
            {score}
          </Text>
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
    alignItems: 'center',
    justifyContent: 'center',
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
  scoreContainer: {
    position: 'absolute',
    bottom: 18,
    right: 10,
  },
  scoreStyle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  gameOverStyle: {
    flex: 0.95,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
