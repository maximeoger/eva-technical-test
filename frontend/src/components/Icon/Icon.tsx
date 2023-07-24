import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft, faCalendarDays } from '@fortawesome/free-solid-svg-icons';

interface Props {
  name: string
}

const IconMap = {
  faArrowLeft : faArrowLeft,
  faArrowRight : faArrowRight,
  faCalendarDays: faCalendarDays
}

const Icon = ({ name }: Props) => {
  return (
    <FontAwesomeIcon icon={IconMap[name]}/>
  )
}

export default Icon;