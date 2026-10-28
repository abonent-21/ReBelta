export type RouteType = 'home' | 'demo';

export type PlatformMode = 'medical' | 'fitness';

export type DemoTab = 'exercises' | 'progress' | 'chat';

export interface Exercise {
  id: string;
  name: string;
  prescription: string;
  status: string;
  completed: boolean;
  targetJoint: string;
  targetAngle: string;
  repsTarget: number;
  repsCompleted: number;
  accuracy: number;
}

export interface ChatMessage {
  id: string;
  sender: 'doctor' | 'patient';
  text: string;
  time: string;
  avatar?: string;
  status?: string;
}

export interface SessionHistoryItem {
  id: string;
  date: string;
  exerciseName: string;
  reps: string;
  accuracy: number;
  smoothness: number;
  status: 'passed' | 'review_required';
  notes: string;
}
