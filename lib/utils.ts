type SoundType = 'alarm' | 'click';

export const playSound = (type: SoundType) => {
  const audio = type === 'alarm' ? '/alarm.wav' : '/mouse-clicks.wav';
  const source = new Audio(audio);
  const volume = 0.5;
  source.volume = volume;
  source.play();
};
