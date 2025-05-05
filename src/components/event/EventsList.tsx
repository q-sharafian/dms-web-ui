import { isRunOnServer, t } from "@/lib/utils";
import { eventService, Event } from "@/lib/api/services/EventService";
import { Empty, List } from "antd";
import { logger } from "@/lib/logger/logger";
import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import Loading from "../ui/Loading";
import { useLoading } from "@/hooks/useLoading";
import EventViewEdit from "./EventViewEdit";
import { useDMSApi } from "@/hooks/useDMSApi";

interface DocsPageProps {
  authToken: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any
  jobPositionID: string
  limit?: number
  offset?: number
  style?: React.CSSProperties
  className?: string
}

const EventsList = ({ dict, style, className, offset, limit, jobPositionID }: DocsPageProps) => {
  logger.debug(`Specified parameters for fetching events (is the component rendered on server: ${isRunOnServer()}): jobPositionID: ${jobPositionID}, limit: ${limit}, offset: ${offset}`)
  const { loading: loadingCount, setLoading } = useLoading()
  const { data: events, loading: loadingApi, error: eventErr, execute: getEventsExecute } = useDMSApi(
    eventService.getJPEvents,
    false,
    setLoading,
    ["error", "warn", "success"]
  )
  useEffect(() => {
    async function f() {
      // setLoading(1)
      await getEventsExecute(jobPositionID, limit, offset)
      // setLoading(-1)
    }
    f()
  }, [getEventsExecute, jobPositionID, limit, offset])

  useEffect(() => {
    if (eventErr) {
      logger.error(`failed to get last docs for ${jobPositionID}: ${eventErr.message}`)
    }
  }, [eventErr, jobPositionID]);

  const [modalEventState, setModalEventState] = useState(false);
  const closeEventModal: () => void = () => {
    setModalEventState(false)
  }
  const openEventModal: () => void = () => {
    setModalEventState(true)
  }
  const [selectedModalEvent, setModalEvent] = useState<Event>()

  return (
    <div style={{ ...style }} className={className}>
      <Loading count={loadingCount} />
      <EventViewEdit
        dict={dict}
        closeModal={closeEventModal}
        isOpenModal={modalEventState}
        event={selectedModalEvent}
        jobPositionID={jobPositionID}
      />
      <List
        grid={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 3, xxl: 4, gutter: 0 }}
        locale={{
          emptyText: <Empty description={t(dict?.common?.notFoundEntity, dict?.event?.anEvent)} />
        }}
        dataSource={events?.data ?? []}
        renderItem={event =>
          <EventCard
            event={event}
            jpID={jobPositionID}
            openEventModal={openEventModal}
            selectEvent={setModalEvent}
            style={{ marginBottom: '1rem', marginLeft: "1rem" }}
          />
        }
      />
    </div>
  )
}

export default EventsList