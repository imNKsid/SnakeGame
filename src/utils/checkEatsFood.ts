import { Coordinate } from "../types/types";

export const checkEatsFood = (
  head: Coordinate, //coordinates of snake's head
  food: Coordinate, //coordinates of food
  area: number //the area which gets captured by the food
) => {
  const distanceBetweenFoodAndSnakeX = Math.abs(head.x - food.x);
  const distanceBetweenFoodAndSnakeY = Math.abs(head.y - food.y);

  return (
    distanceBetweenFoodAndSnakeX < area && distanceBetweenFoodAndSnakeY < area
  );
};
