import { Coordinate } from "../types/types";

export const checkGameOver = (snakeHead: Coordinate, boundaries: any) => {
  //Here, snakeHead is having x & y coordinates of snake's head representing current position of Snake
  //The boundaries is basically the GAME_BOUNDS consisting xMin, xMax, yMin, and yMax, which represent the minimum and maximum x & y coordinates allowed for the snake on the grid.
  return (
    snakeHead.x < boundaries.xMin || //The x-coordinate of the snakeHead is less than boundaries.xMin. This means the snake's head has moved too far to the left, exceeding the left boundary
    snakeHead.x > boundaries.xMax || //The x-coordinate of the snakeHead is greater than boundaries.xMax. This means the snake's head has moved too far to the right, exceeding the right boundary.
    snakeHead.y > boundaries.yMax || //The y-coordinate of the snakeHead is greater than boundaries.yMax. This means the snake's head has moved too far down, exceeding the lower boundary.
    snakeHead.y < boundaries.yMin //The y-coordinate of the snakeHead is less than boundaries.yMin. This means the snake's head has moved too far up, exceeding the upper boundary.
  );
};
