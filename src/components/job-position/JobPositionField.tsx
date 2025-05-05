/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDMSApi } from "@/hooks/useDMSApi"
import { MsgTypes } from "@/interfaces/msgType"
import { JobPosition, jpService } from "@/lib/api/services/JPService"
import { t } from "@/lib/utils"
import { Empty, Select } from "antd"
import { useEffect, useState } from "react"

interface JobPositionFieldProps {
  style?: React.CSSProperties
  className?: string
  userID: string
  dict: any
  disabled?: boolean
  setLoading?: (val: number) => void
  /** A function to throws selected job position. */
  onJPSelected?: (jp: JobPosition) => void
  /** Throws the selected job position ID */
  onChange?: (jpID: string) => void
  value?: string
  defaultValue?: string
  /** 
   * List of message that could be displayed during fetching job-positions.
   * If it is `undefined` and not set, show `error` and `warn` messages.
   */
  msgTypes?: MsgTypes[]
}

const JobPositionField = (p: JobPositionFieldProps) => {
  const { data: fetchedJPs, execute: executeGetJPs, loading: loadingGetJPs }
    = useDMSApi(jpService.getCurrentUserJPs, false, undefined, p.msgTypes ?? ["error", "warn"]);
  const [options, setOptions] = useState<any[] | undefined>([]);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);

  useEffect(() => {
    setSelectedOption(p?.value);
}, [p?.value]);
  useEffect(() => {
    if (loadingGetJPs) p.setLoading?.(1)
    else p.setLoading?.(-1)
  }, [loadingGetJPs, p])
  useEffect(() => {
    if (p.userID == null) return
    executeGetJPs(p.userID);
  }, [executeGetJPs, p.userID])
  useEffect(() => {
    if (loadingGetJPs) return;
    const tempOptions: any[] | undefined = []
    fetchedJPs?.data.forEach(jp => {
      tempOptions.push({
        label: jp.title,
        value: jp.id
      })
    });
    setOptions(tempOptions);
  }, [fetchedJPs, loadingGetJPs]);

  return (
    <Select className={p.className + " min-w-40"}
      loading={loadingGetJPs}
      options={options}
      placeholder={t(p.dict?.common?.jobPosition)}
      value={selectedOption}
      defaultValue={p.defaultValue}
      onChange={(selectedJP) => {
        setSelectedOption(selectedJP);
        console.log("vvv: ", selectedJP);
        p.onChange?.(selectedJP);
        fetchedJPs?.data.forEach(jp => {
          if (jp.id === selectedJP) {
            p.onJPSelected?.(jp);
            return;
          }
        })
      }}
      disabled={p.disabled}
      notFoundContent={<Empty description={t(p.dict?.common.notFoundAny)} />}
      showSearch
    // // TODO: Implement search feature
    // onSearch={(val) => console.log("Implement it. val: ", val)}
    />
  )
}

export default JobPositionField;