export interface Timer {
  minutes: number;
  seconds: number;
  isPaused: boolean;
}

export interface TimerState {
  timer: Timer;
  status: TimerStatus;
  counter: number;
  phase: number;
  base: number;
  percentage: number;
}

export type TimerStatus = 'focus' | 'shortBreak' | 'longBreak';
export type BreakStatus = 'shortBreak' | 'longBreak';
