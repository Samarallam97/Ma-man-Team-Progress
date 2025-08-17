export interface Course {
  id: string;
  name: string;
  totalHours: number;
  elapsedHours: number;
  progress: number;
}

export interface Student {
  id: string;
  name: string;
  email:string;
  totalHours: number;
  lastWeekHours: number;
  avatar:string;
  courses: Course[];
}

export interface StudentSummary {
  id: string;
  name: string;
}