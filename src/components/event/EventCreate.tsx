import { useLoading } from "@/hooks/useLoading";
import Loading from "../ui/Loading";
import { useEffect, useState } from "react";
import CModal from "../ui/CModal";
import { t } from "@/lib/utils";
import JobPositionField from "../job-position/JobPositionField";
import { JobPosition } from "@/lib/api/services/JPService";
import useCUPStorage from "@/hooks/useClientStorage";
import { LSFieldKey } from "@/interfaces/clientStorageData";
import { logger } from "@/lib/logger/logger";
import { Event, eventService } from "@/lib/api/services/EventService"
import { Button, Form, Input, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDMSApi } from "@/hooks/useDMSApi";
import EventForm from "./EventForm";

interface EventCreateProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any
  style?: React.CSSProperties
  className?: string
  /** Default job position we're using */
  jobPositionID?: string
  modalState: boolean
  /** In the function body, there must be a hook to change the modal state. */
  setModalState: (state: boolean) => void
}

const EventCreate = (p: EventCreateProps) => {
  const { loading: loadingCount, setLoading } = useLoading()
  const [selectedJP, setJP] = useState<string | null>(null)
  const [selectedEvent, setEvent] = useState<Event | null>(null)

  const [form] = Form.useForm();

  const { data: createdEventResult, execute: executeCreateEvent, loading: loadingCreateEvent,
    error: createEventError
  } = useDMSApi(eventService.createEvent, false, undefined, ["error", "warn", "success"]);
  useEffect(() => {
    if (!loadingCreateEvent && createEventError == null && createdEventResult != null) {
      form.resetFields();
      p.setModalState(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createEventError, createdEventResult, loadingCreateEvent])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (values: any) => {
    logger.debug("Received event's details to create:", values);
    executeCreateEvent(values);
  };

  return (
    <CModal
      style={{ ...p.style }}
      className={p.className}
      title={t(p.dict?.common?.createA, p.dict?.common?.event)}
      open={p.modalState}
      onCancel={() => { p.setModalState(false) }}
      footer=""
    >
      <Loading count={loadingCount} />
      <EventForm
        dict={p.dict}
        onFinish={onFinish}
        form={form}
        loading={loadingCreateEvent}
        jpID={p.jobPositionID || ""}
      />
    </CModal>
  )
}

export default EventCreate;