import g from '@/src/assets/data/goals.json';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { z } from "zod";

export const GoalLiterals: Record<string, string> = 
  g.reduce((acc, val) => ({...acc, [val.id]: val.id}), {});
export const GoalSchema = z.nativeEnum(GoalLiterals);
export type PossibleGoal = z.infer<typeof GoalSchema>

export interface Goal {
  id: PossibleGoal;
  name?: string;
  description?: string;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap; // Type-safe icon names
}