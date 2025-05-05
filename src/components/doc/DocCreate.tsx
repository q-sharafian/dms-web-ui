import { useLoading } from "@/hooks/useLoading";
import Loading from "../ui/Loading";
import { useState } from "react";
import CModal from "../ui/CModal";
import { t } from "@/lib/utils";
import JobPositionField from "../job-position/JobPositionField";
import { JobPosition } from "@/lib/api/services/JPService";
import useCUPStorage from "@/hooks/useClientStorage";
import { LSFieldKey } from "@/interfaces/clientStorageData";
import { logger } from "@/lib/logger/logger";
import EventField from "../event/EventField";
import { Event } from "@/lib/api/services/EventService"

interface DocCreateProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dict: any
  style?: React.CSSProperties
  className?: string
  jobPositionID: string
  modalState: boolean
  /** In the function body, there must be a hook to change the modal state. */
  setModalState: (state: boolean) => void
}

const DocCreate = (p: DocCreateProps) => {
  const { loading: loadingCount, setLoading } = useLoading()
  const [selectedJP, setJP] = useState<string | null>(null)
  const [selectedEvent, setEvent] = useState<Event | null>(null)
  const [userID,] = useCUPStorage(LSFieldKey.userID, "")

  return (
    <CModal
      style={{ ...p.style }}
      className={p.className}
      title={t(p.dict?.common?.createA, p.dict?.docs?.doc)}
      open={p.modalState}
      onCancel={() => { p.setModalState(false) }}
    >
      <Loading count={loadingCount} />
      <JobPositionField
        dict={p.dict}
        onJPSelected={(jp: JobPosition) => { setJP(jp.id); logger.debug("selected job-position ", jp) }}
        userID={userID}
      />
      <EventField
        dict={p.dict}
        jobPositionID={selectedJP ?? ""}
        onEventSelected={(event: Event) => { setEvent(event); logger.debug("selected event ", event) }}
      />
      <br />
      aa: {selectedJP}
    </CModal>
  )
}

export default DocCreate;