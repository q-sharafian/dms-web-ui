import { DocWithEventName } from "@/lib/api/services/DocService"
import { t } from "@/lib/utils"
import CModal from "../ui/CModal"

interface DocViewEditProps {
  style?: React.CSSProperties
  className?: string
  /** Job position ID is responsible of sending/getting requests to the server */
  jobPositionID: string
  doc: DocWithEventName | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictionary: any
  isOpenModal: boolean
  closeModal: () => void
}

/** A component to see all related-doc details and editing them. */
const DovViewEdit: React.FC<DocViewEditProps> = (p: DocViewEditProps) => {
  return (
    <CModal
      title={t(p.doc?.event_name as string)}
      open={p.isOpenModal}
      onCancel={p.closeModal}
      okText={t(p.dictionary?.common?.save)}
      cancelText={t(p.dictionary?.common?.close)}
      style={{ ...p.style }}
      className={p.className}
    >
      <p>{p.doc?.context}</p>
    </CModal>
  )
}

export default DovViewEdit;