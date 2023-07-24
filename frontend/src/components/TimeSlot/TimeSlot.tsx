import classNames from "classnames";
import './TimeSlot.scss';

interface Props {
  onClick: () => void;
  startTime: string;
  selected: boolean;
}

const TimeSlot = ({onClick, startTime, selected}: Props) => {
  return (
    <button className={
      classNames("TimeSlot", {"TimeSlot--selected": selected})
    } onClick={onClick}>
      <span>{startTime}</span>
    </button>
  )
}

export default TimeSlot;