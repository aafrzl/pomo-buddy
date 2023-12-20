/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { playSound } from '@/lib/utils';
import { useTimer } from '@/store/timer';
import { Button, Card, CardBody } from '@nextui-org/react';
import { Pause, Play, RefreshCcw, SkipForward } from 'lucide-react';
import React, { useEffect } from 'react';

export default function TimerPomodoro() {
  const state = useTimer();

  const {
    focus,
    longBreak,
    replay,
    shortBreak,
    speed,
    status,
    timer,
    setTimerState,
    phase,
    setPauseTimer,
  } = state;

  function setTimer() {
    const baseValue =
      status === 'focus'
        ? focus
        : status === 'shortBreak'
          ? shortBreak
          : longBreak;

    setTimerState({
      ...state,
      timer: {
        ...state.timer,
        isPaused: true,
        minutes: baseValue,
        seconds: 0,
      },
      base: baseValue * 60,
      percentage: baseValue * 60,
    });
  }

  function renderStatus() {
    switch (state.status) {
      case 'focus':
        return 'Focus until next break...';
      case 'shortBreak':
        return "Short break, you'll be back soon";
      case 'longBreak':
        return 'Long break, you deserve it!';
      default:
        return 'Focus until next break...';
    }
  }

  useEffect(() => {
    setTimer();
  }, [state.status, focus, longBreak, replay, shortBreak, speed]);

  useEffect(() => {
    if (timer.isPaused) return;

    if (timer.seconds > 0 || timer.minutes > 0) {
      // Decrease seconds
      const timer = setTimeout(
        () => {
          if (state.timer.seconds > 0) {
            setTimerState({
              ...state,
              timer: {
                ...state.timer,
                seconds: state.timer.seconds - 1,
              },
              percentage: state.percentage - 1,
            });
          } else if (state.timer.minutes > 0) {
            setTimerState({
              ...state,
              timer: {
                ...state.timer,
                minutes: state.timer.minutes - 1,
                seconds: 59,
              },
              percentage: state.percentage - 1,
            });
          }
        },
        (1 / speed) * 1000
      );

      // Clear the timer when the component unmounts
      return () => clearTimeout(timer);
    } else {
      switch (status) {
        case 'focus':
          if (state.counter < replay && phase < 4) {
            playSound('alarm');
            setTimerState({
              ...state,
              status: 'shortBreak',
              timer: {
                ...state.timer,
                isPaused: false,
                minutes: shortBreak,
                seconds: 0,
              },
            });
          } else {
            playSound('alarm');
            setTimerState({
              ...state,
              status: 'longBreak',
              timer: {
                ...state.timer,
                isPaused: true,
                minutes: longBreak,
                seconds: 0,
              },
              counter: 0,
            });
          }
          break;
        case 'shortBreak':
          playSound('alarm');
          setTimerState({
            ...state,
            status: 'focus',
            timer: {
              ...state.timer,
              isPaused: false,
              minutes: focus,
              seconds: 0,
            },
            phase: phase + 1,
          });
          break;
        case 'longBreak':
          playSound('alarm');
          setTimerState({
            ...state,
            status: 'focus',
            timer: {
              ...state.timer,
              isPaused: true,
              minutes: focus,
              seconds: 0,
            },
            phase: 1,
          });
          break;
      }
    }
  }, [state.timer]);

  function handlePause() {
    playSound('click');
    setPauseTimer();
  }

  function handleNext() {
    playSound('click');
    if (state.status === 'focus' && state.phase < 4) {
      setTimerState({ ...state, status: 'shortBreak' });
    } else if (state.status === 'shortBreak' && state.phase < 4) {
      setTimerState({ ...state, status: 'focus', phase: state.phase + 1 });
    } else if (state.status === 'focus' && state.phase === 4) {
      setTimerState({ ...state, status: 'longBreak', phase: 4 });
    } else {
      setTimerState({ ...state, status: 'focus', phase: 1 });
    }
  }

  function renderPhase() {
    switch (state.phase) {
      case 1:
        return 'First phase';
      case 2:
        return 'Second phase';
      case 3:
        return 'Third phase';
      case 4:
        return 'Fourth phase';
      default:
        return 'First phase';
    }
  }

  return (
    <Card>
      <CardBody className="flex flex-row items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">
            {state.timer.minutes < 10 ? '0' : ''}
            {state.timer.minutes}:{state.timer.seconds < 10 ? '0' : ''}
            {state.timer.seconds}
          </h3>
          <p className="text-base font-semibold tracking-wide">
            {renderStatus()} {state.counter > 0 && `(${state.counter})`}
          </p>
          <p className="mt-3 text-sm leading-5 tracking-tight">
            {renderPhase()} of 4 phases
          </p>
        </div>
        <div className="inline-flex items-center gap-2">
          <Button
            onClick={handlePause}
            size="sm"
            variant="flat"
            color="success">
            {timer.isPaused ? (
              <Play className="h-5 w-5" />
            ) : (
              <Pause className="h-5 w-5" />
            )}
          </Button>
          <Button
            onClick={handleNext}
            size="sm"
            variant="flat"
            color="default">
            {phase === 4 && status === 'longBreak' ? (
              <RefreshCcw className="h-5 w-5" />
            ) : (
              <SkipForward className="h-5 w-5" />
            )}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
