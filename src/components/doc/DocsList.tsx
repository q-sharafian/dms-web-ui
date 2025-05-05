import { isRunOnServer } from "@/lib/utils";
import { docService, DocWithEventName } from "@/lib/api/services/DocService";
import { List } from "antd";
import { logger } from "@/lib/logger/logger";
import { useEffect, useState } from "react";
import DocCard from "./DocCard";
import Loading from "../ui/Loading";
import { useLoading } from "@/hooks/useLoading";
import DovViewEdit from "./DovViewEdit";
import { useDMSApi } from "@/hooks/useDMSApi";

interface DocsPageProps {
  authToken: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictionary: any
  jobPositionID: string
  limit?: number
  offset?: number
  style?: React.CSSProperties
  className?: string
}

const DocsList = ({ authToken, dictionary, style, className, offset, limit, jobPositionID }: DocsPageProps) => {
  logger.debug(`Specified parameters for fetching docs (is the component rendered on server: ${isRunOnServer()}): jobPositionID: ${jobPositionID}, limit: ${limit}, offset: ${offset}`)
  const { loading: loadingCount, setLoading } = useLoading()
  const { data: docs, loading: loadingApi, error: docsErr, execute: getDocsExecute } = useDMSApi(
    docService.getNLastDocs,
    false,
    setLoading,
    ["error", "warn", "success"]
  )
  useEffect(() => {
    async function f() {
      setLoading(1)
      await getDocsExecute(jobPositionID, offset, limit)
      setLoading(-1)
    }
    f()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getDocsExecute, jobPositionID, limit, offset])

  useEffect(() => {
    if (docsErr) {
      logger.error(`failed to get last docs for ${jobPositionID}: ${(docsErr as Error).message}`)
    }
  }, [docsErr, jobPositionID]);

  const [modalDocState, setModalDocState] = useState(false);
  const closeDocModal: () => void = () => {
    setModalDocState(false)
  }
  const openDocModal: () => void = () => {
    setModalDocState(true)
  }
  const [selectedModalDoc, setModalDoc] = useState<DocWithEventName>()

  return (
    <div style={{ ...style }} className={className}>
      <Loading count={loadingCount} />
      <DovViewEdit
        dictionary={dictionary} closeModal={closeDocModal} isOpenModal={modalDocState}
        doc={selectedModalDoc} jobPositionID={jobPositionID}
      />
      <List
        grid={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 3, xxl: 4, gutter: 0 }}
        dataSource={docs?.data}
        renderItem={doc =>
          <DocCard doc={doc} openDocModal={openDocModal} selectDoc={setModalDoc} style={{ marginBottom: '1rem', marginLeft: "1rem" }} />
        }
      />
    </div>
  )
}

export default DocsList