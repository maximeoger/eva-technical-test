import classNames from "classnames";
import './ScheduleDay.scss';

interface Props {
  dayStr: string;
  onClick: () => void;
  selected: boolean;
}

const ScheduleDay = ({dayStr, onClick, selected}: Props) => {
  const splitedDate = dayStr.split(' ')

  const [weekDay, month, day, year] = splitedDate;

  return (
    <button className={
      classNames("ScheduleDay", {"ScheduleDay--selected": selected})
    } onClick={onClick}>
      <div>
        <div className="ScheduleDay__weekDay">{weekDay}</div>
        <div className="ScheduleDay__day">{day}</div>
      </div>
      <div>
        <div className="ScheduleDay__month">{month}</div>
        <div className="ScheduleDay__year">{year}</div>
      </div>
    </button>
  )
}

export default ScheduleDay;