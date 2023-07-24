import { ReactNode, useState, createContext, useContext, useMemo } from 'react';
import { Availability, AvailabilitySchedule } from "../Availability/Availability.types";
import useRequest from "../../Technical/useRequest";

interface ReservationContext {
  selection: Availability | null;
  clearSelection: () => void;
  pickSelection: (selection: Availability) => void;
  availabilities: AvailabilitySchedule | undefined;
  loading: boolean,
  error: boolean,
  days: Array<string>
}

export const ReservationContext = createContext<ReservationContext>({
  selection: null,
  availabilities: undefined,
  loading: true,
  error: false,
  clearSelection: () => {},
  pickSelection: () => {},
  days: [],
})

function useReservationStateProvider() {
  const [selection, setSelection] = useState<Availability>(null);
  const [ selectedDay, setSelectedDay ] = useState<string>(null);
  const { data, loading, error } = useRequest({ endpoint: '/slots' })

  const availabilities = useMemo(() => {
    if(!data) return;

    const nextAvailabilities: AvailabilitySchedule = new Map();

    data.forEach((availability: Availability) => {
      const dataExists = nextAvailabilities.get(availability.day);
      if(dataExists) {
        nextAvailabilities.set(availability.day, [...dataExists, availability]);
      } else {
        nextAvailabilities.set(availability.day, [availability]);
      }
    })

    return nextAvailabilities;
  }, [data])

  const clearSelection = () => {
    setSelection(null);
    setSelectedDay(null);
  };

  const pickSelection = (selection: Availability) => setSelection(selection);
  const pickDay = (day: string) => setSelectedDay(day);

  return {
    selection,
    availabilities,
    pickSelection,
    clearSelection,
    loading,
    error,
    days: availabilities ? Array.from(availabilities.keys()) : [],
    pickDay,
    selectedDay,
  }
}

export const ReservationProvider = ({children}: ReactNode) => {
  const value = useReservationStateProvider();
  return (
    <ReservationContext.Provider value={value}>
      { children }
    </ReservationContext.Provider>
  )
}

export const useReservationContext = () => useContext(ReservationContext)