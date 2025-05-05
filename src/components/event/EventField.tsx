/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDMSApi } from "@/hooks/useDMSApi"
import { MsgTypes } from "@/interfaces/msgType"
import { eventService } from "@/lib/api/services/EventService"
import { Event } from "@/lib/api/services/EventService"
import { t } from "@/lib/utils"
import { Empty, Select } from "antd"
import { useEffect, useRef, useState } from "react"

interface JobPositionFieldProps {
  style?: React.CSSProperties
  className?: string
  dict: any
  jobPositionID: string
  disabled?: boolean
  setLoading?: (val: number) => void
  /** A function to set react hook represents selected job position.*/
  onEventSelected: (event: Event) => void
  /**
   * If job position is undefined or empty string, show this message if the select box opened.
   */
  emptyJPIDMsg?: string
  /** 
   * List of message that could be displayed during fetching job-positions.
   * If it is `undefined` and not set, show `error` and `warn` messages.
   */
  msgTypes?: MsgTypes[]
}

const EventField = (p: JobPositionFieldProps) => {
  const { data: fetchedEvents, execute: executeGetEvents, loading: loadingGetEvents }
    = useDMSApi(eventService.getJPEvents, false, undefined, p.msgTypes ?? ["error", "warn"]);
  const options = useRef<any[] | undefined>([]);

  // useEffect(() => {
  //   [fetchedEvents, executeGetEvents,loadingGetEvents ]
  //   = useDMSApi(eventService.getCurrentJPEvents, false, undefined, p.msgTypes ?? ["error", "warn"]);
  // })
  useEffect(() => {
    if (loadingGetEvents) p.setLoading?.(1)
    else p.setLoading?.(-1)
  }, [loadingGetEvents, p])
  useEffect(() => {
    if (p.jobPositionID == null || p.jobPositionID == "") return
    executeGetEvents(p.jobPositionID);
  }, [executeGetEvents, p.jobPositionID])
  useEffect(() => {
    const tempOptions: any[] | undefined = []
    fetchedEvents?.data?.forEach(event => {
      tempOptions.push({
        label: event.name,
        value: event.id
      })
    });
    options.current = tempOptions;
  }, [fetchedEvents?.data]);

  const [emptyBoxMsg, setEmptyBoxMsg] = useState<string>(p.emptyJPIDMsg ?? t(p.dict?.common.pleaseSelectFirst, p.dict?.common?.jobPosition));
  useEffect(() => {
    setEmptyBoxMsg(p.jobPositionID == null || p.jobPositionID === "" ?
      (p.emptyJPIDMsg ?? t(p.dict?.common.pleaseSelectFirst, p.dict?.common?.jobPosition)) :
      t(p.dict?.common.notFoundAny));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p.jobPositionID])

  return (
    <Select className={p.className + " min-w-40"}
      loading={loadingGetEvents}
      options={options.current}
      placeholder={t(p.dict?.common?.event)}
      onChange={(event) => p.onEventSelected(event)}
      disabled={p.disabled}
      notFoundContent={<Empty description={emptyBoxMsg} />}
      showSearch
    // // TODO: Implement search feature
    // onSearch={(val) => console.log("Implement it. val: ", val)}
    />
  )
}

export default EventField;