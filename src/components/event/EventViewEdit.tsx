/* eslint-disable @typescript-eslint/no-explicit-any */
import { t } from "@/lib/utils"
import CModal from "../ui/CModal"
import { Event, eventService } from "@/lib/api/services/EventService"
import { Form } from "antd"
import EventForm from "./EventForm"
import { useDMSApi } from "@/hooks/useDMSApi"


interface EventViewEditProps {
  style?: React.CSSProperties
  className?: string
  /** Job position ID is responsible of sending/getting requests to the server */
  jobPositionID: string
  event: Event | undefined
  dict: any
  isOpenModal: boolean
  closeModal: () => void
}

/** A component to see all related-event details and editing them. */
const EventViewEdit: React.FC<EventViewEditProps> = ({ style, className, jobPositionID, event, dict, isOpenModal, closeModal }) => {
  const [form] = Form.useForm();

  // useEffect(() => {
  //     form.resetFields();
  //     closeModal();
  // })
  // logger.debug(`Default selected event details: ${event}`)

  return (
    <CModal
      title={t(event?.name as string)}
      open={isOpenModal}
      onCancel={closeModal}
      okText={t(dict?.common?.save)}
      cancelText={t(dict?.common?.close)}
      style={{ ...style }}
      className={className}
    >
      <EventForm
        dict={dict}
        className="!mb-20"
        // onFinish={updateEvent}
        form={form}
        loading={false}
        // jpID={jobPositionID}
        defaultEvent={event}
        hideButtons
        disabled
      />
    </CModal>

  )
}

export default EventViewEdit;