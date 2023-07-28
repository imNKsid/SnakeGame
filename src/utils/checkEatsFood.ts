import { Coordinate } from "../types/types";

export const checkEatsFood = (
  head: Coordinate, //coordinates of snake's head
  food: Coordinate, //coordinates of food
  area: number //the area which gets captured by the food
  //The 'area' is the number that defines the area around the food within which the snake is considered to have eaten the food
) => {
  const distanceBetweenFoodAndSnakeX = Math.abs(head.x - food.x); //absolute difference between the x-coordinate of the snake's head and the x-coordinate of the food
  //This gives us the number of units the snake's head is away from the food in the horizontal (left-right) direction.

  const distanceBetweenFoodAndSnakeY = Math.abs(head.y - food.y); //absolute difference between the y-coordinate of the snake's head and the y-coordinate of the food
  //This gives us the number of units the snake's head is away from the food in the vertical (up-down) direction.

  return (
    distanceBetweenFoodAndSnakeX < area && distanceBetweenFoodAndSnakeY < area
    //If both distances are less than the area, it means the snake's head is within the specified area around the food, and the function returns true, indicating that the snake has eaten the food
  );
};
