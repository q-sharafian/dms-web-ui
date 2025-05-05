import { Event } from "@/lib/api/services/EventService"
import routes from "@/routes"
import { Card } from "antd"

interface EventCardProps {
  event: Event
  jpID: string
  style?: React.CSSProperties
  className?: string
  selectEvent?: (doc: Event) => void
  openEventModal?: () => void

}

const EventCard: React.FC<EventCardProps> = ({ event, style, className, selectEvent, openEventModal, jpID }: EventCardProps) => {
  const handleOpenModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    selectEvent?.(event);
    openEventModal?.()

  }

  return (
    <a href={routes.eventDetails(jpID, event.id)} onClick={handleOpenModal}>
      <Card style={{ ...style }} className={className} title={event.name}>
        <p>{event.description}</p>
        {/* {event.} */}
      </Card>
    </a>
  );
}

export default EventCard