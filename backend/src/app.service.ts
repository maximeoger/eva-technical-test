import dayjs from 'dayjs';
import { Injectable } from '@nestjs/common';
import { Availabilities } from './Slots/Slots.interface';
import { getData } from './helpers/getData';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async getSlots(): Promise<Availabilities[]> {
    const { opening_time, terrains, session_duration } = await getData();

    const nextAvailabilities: Array<Availabilities> = [];

    const weekdays = {
      1: 'monday',
      2: 'tuesday',
      3: 'wednesday',
      4: 'thursday',
      5: 'friday',
      6: 'saturday',
      0: 'sunday',
    };

    const startingTime = dayjs();
    const endingTime = startingTime.add(30, 'days');
    const sessionDuration = Number(session_duration.split(':')[1]);

    let current = startingTime;

    while (current <= endingTime) {
      const day = weekdays[current.get('day')];
      const isOpen = opening_time[day];

      // skip if room is closed
      if (!isOpen) {
        current = current.add(1, 'day').hour(0).minute(0);
        continue;
      }

      isOpen.forEach(({ from, to }) => {
        const [fromHour, fromMin] = from.split(':');
        const [toHour, toMin] = to.split(':');

        let slot = current.hour(fromHour).minute(fromMin);
        let lastSlotForPeriod = slot
          .hour(toHour)
          .minute(toMin)
          .subtract(sessionDuration, 'minutes');

        if (slot > lastSlotForPeriod) {
          lastSlotForPeriod = lastSlotForPeriod.add(1, 'day');
        }

        while (slot <= lastSlotForPeriod) {
          /*
            Adding minutes like this allow us to stay on the same day
            even when timeslot goes beyond midnigth.
          */
          const nextSlot = slot.add(sessionDuration, 'minutes');
          nextAvailabilities.push({
            day: current.format('ddd MMM DD YYYY'),
            startTime: slot.format('HH:mm'),
            endTime: nextSlot.format('HH:mm'),
            players: terrains.reduce(
              (total, { players }) => players + total,
              0,
            ),
          });
          slot = nextSlot;
        }
      });

      current = current.add(1, 'day');
    }

    return nextAvailabilities;
  }
}
