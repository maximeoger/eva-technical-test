export interface Availability {
  day: string;
  startTime: string;
  endTime: string;
  players: number;
}

export type AvailabilitySchedule = Map<string, Array<Availability>>;