import { useRef } from 'react';
import { useReservationContext } from "../../Business/Reservation/ReservationContext";
import Icon from '../Icon/Icon';
import TimeSlot from "../TimeSlot/TimeSlot";
import ScheduleDay from "../ScheduleDay/ScheduleDay";
import { Availability } from "../../Business/Availability/Availability.types";
import './Calendar.scss'

const Calendar = () => {
  const { pickDay, selectedDay, selection, pickSelection, days, clearSelection, availabilities, loading, error } = useReservationContext();
  const sliderRef = useRef(null);

  const slideToLeft = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollLeft += 117;
  }

  const slideToRight = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollLeft -= 117;
  }

  const slotIsSelected = (slot: Availability) => {
    if(!selection) return false
    return selection.startTime === slot.startTime && selection.day === slot.day;
  }

  return (
    <div className="Calendar">
      <div className="Calendar__header">
        <div>
          <span>Calendar</span>
          <span>
            <Icon name={"faCalendarDays"}/>
          </span>
        </div>
        <button onClick={clearSelection}>Clear my selection</button>
      </div>
      {
        loading && (<span>Loading</span>)
      }
      {
        error && (<span>error</span>)
      }
      <div className="Calendar__scheduleDays">
        <div className="Calendar__iconContainer">
          <button onClick={slideToRight}><Icon name="faArrowLeft"/></button>
        </div>
        <div className={"Calendar__scheduleDays__scrollbox"} ref={sliderRef}>
          {
            !loading && !error && days && (
              days.map((day, key) => (
                <ScheduleDay
                  selected={selectedDay === day}
                  dayStr={day} key={`${day}-${key}`}
                  onClick={() => pickDay(day)}
                />
              ))
            )
          }
        </div>
        <div className="Calendar__iconContainer">
          <button onClick={slideToLeft}><Icon name="faArrowRight"/></button>
        </div>
      </div>

      {
        selectedDay && availabilities && (
          <div className="Calendar__slots">
            <div className="Calendar__slotsHeader">
              <span>Available Time Slots</span>
            </div>
            <div className="Calendar__slotsContainer">
              {
                availabilities.get(selectedDay).map((slot, key) => (
                    <TimeSlot
                      key={`${slot.day}-${key}`}
                      onClick={() => pickSelection(slot)}
                      selected={slotIsSelected(slot)}
                      startTime={slot.startTime}
                    />
                  )
                )
              }
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Calendar;