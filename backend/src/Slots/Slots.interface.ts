export enum weekday {
  monday = 'monday',
  tuesday = 'tuesday',
  wednesday = 'wednesday',
  thursday = 'thursday',
  friday = 'friday',
  saturday = 'saturday',
  sunday = 'sunday',
}

export type openingTimeRange = {
  from: string;
  to: string;
};

export type openingTime = {
  [key in weekday]: Array<openingTimeRange>;
};

export type terrain = {
  name: string;
  players: number;
};

export interface RoomSettings {
  opening_time: openingTime;
  terrains: Array<terrain>;
  session_duration: string;
}

export interface Availabilities {
  day: string;
  startTime: string;
  endTime: string;
  players: number;
}
