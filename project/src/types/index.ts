// Types and interfaces for the dashboard
export const TEAMS = {
  AI: 'AI',
  FRONT: 'Front',
  BACK: 'Back',
  SECURITY: 'Security'
} as const;

export const GOAL_STATUS = {
  ACHIEVED: 'achieved',
  NOT_ACHIEVED: 'not_achieved',
  IN_PROGRESS: 'in_progress',
  BREAK: 'break'

} as const;

export type TeamType = typeof TEAMS[keyof typeof TEAMS];
export type GoalStatusType = typeof GOAL_STATUS[keyof typeof GOAL_STATUS];

export interface Course {
  name: string;
  progress: number;
  totalHours: number;
}

export interface Member {
  id: number;
  name: string;
  email: string;
  totalHours: number;
  lastWeekHours: number;
  goalStatus: GoalStatusType;
  avatar: string;
  courses: Course[];
}

export interface Team {
  id: string;
  name: TeamType;
  icon: string;
  color: string;
  members: Member[];
}