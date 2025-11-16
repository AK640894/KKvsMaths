
import { Mission, MissionType } from '../types';
import { MAX_NUMBER } from '../constants';

export function generateNewMission(): Mission {
  const missionTypes = [MissionType.COUNTING, MissionType.ADDITION, MissionType.SUBTRACTION];
  const type = missionTypes[Math.floor(Math.random() * missionTypes.length)];

  switch (type) {
    case MissionType.ADDITION: {
      const a = Math.floor(Math.random() * (MAX_NUMBER / 2 + 1));
      const b = Math.floor(Math.random() * (MAX_NUMBER - a + 1));
      return {
        type,
        text: `Start at ${a}. Add ${b} jumps. Where do you land?`,
        operands: [a, b],
        answer: a + b,
      };
    }
    case MissionType.SUBTRACTION: {
      const a = Math.floor(Math.random() * (MAX_NUMBER + 1));
      const b = Math.floor(Math.random() * (a + 1));
      return {
        type,
        text: `Start at ${a}. Go back ${b} jumps. Where do you land?`,
        operands: [a, b],
        answer: a - b,
      };
    }
    case MissionType.COUNTING:
    default: {
      const target = Math.floor(Math.random() * (MAX_NUMBER + 1));
      return {
        type,
        text: `Your mission is to land the rocket on number ${target}.`,
        operands: [0], // Start at 0 for counting missions
        answer: target,
      };
    }
  }
}
