import { Timer, TimerStatus } from "@/types/timer";
import { create } from "zustand";

export interface InitialTimerState {
  focus: number;
  shortBreak: number;
  longBreak: number;
  replay: number;
  speed: number;
  timer: Timer;
  status: TimerStatus;
  counter: number;
  phase: number;
  base: number;
  percentage: number;
  setTimerState: (newState: InitialTimerState) => void;
  setPauseTimer(): void;
}

export const useTimer = create<InitialTimerState>()(set => ({
  focus: 25,
  shortBreak: 5,
  longBreak: 15,
  replay: 4,
  speed: 1.03,
  timer: {
    minutes: 25,
    seconds: 0,
    isPaused: true,
  },
  status: "focus",
  counter: 0,
  phase: 0,
  base: 0,
  percentage: 0,
  setTimerState: (newState: InitialTimerState) =>
    set(state => ({
      ...state,
      ...newState,
    })),
  setPauseTimer() {
    set(state => ({
      ...state,
      timer: {
        ...state.timer,
        isPaused: !state.timer.isPaused,
      },
    }));
  },
}));
