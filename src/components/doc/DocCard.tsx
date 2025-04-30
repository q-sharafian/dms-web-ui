import { DocWithEventName } from "@/lib/api/services/DocService"
import routes from "@/routes"
import { Card } from "antd"

interface DocCardProps {
  doc: DocWithEventName
  style?: React.CSSProperties
  className?: string
  selectDoc?: (doc: DocWithEventName) => void
  openDocModal?: () => void

}

const DocCard: React.FC<DocCardProps> = ({ doc, style, className, selectDoc, openDocModal }: DocCardProps) => {
  const handleOpenModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    selectDoc?.(doc);
    openDocModal?.()

  }

  return (
    <a href={routes.docDetails(doc.id)} onClick={handleOpenModal}>
      <Card style={{ ...style }} className={className}
        title={doc.event_name}>
        <p>{doc.context}</p>
      </Card>
    </a>
  );
}

export default DocCard