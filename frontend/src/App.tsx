import { ReservationProvider } from "./Business/Reservation/ReservationContext";
import Calendar from "./components/Calendar/Calendar";

function App() {
  return (
    <ReservationProvider>
      <Calendar/>
    </ReservationProvider>
  )
}

export default App
