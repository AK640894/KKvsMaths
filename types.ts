
export enum MissionType {
  COUNTING = 'COUNTING',
  ADDITION = 'ADDITION',
  SUBTRACTION = 'SUBTRACTION',
}

export interface Mission {
  type: MissionType;
  text: string;
  operands: number[];
  answer: number;
}

export interface Sticker {
  id: string;
  imageData: string;
  prompt: string;
}
