import { Ingredient } from './Ingredient';

export interface Recipe {
  id: string;
  name: string;
  steps: string[];
  picture?: string;
  rating?: number;
  creationTime?: Date;
  lastModifiedTime?: Date;
  ingredients: Ingredient[];
  creator: string;
}
