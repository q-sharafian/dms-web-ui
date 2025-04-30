import { Modal } from "antd"

interface CModalProps {
  /** The modal dialog's title */
  title?: React.ReactNode;
  /** Whether the modal dialog is visible or not */
  open?: boolean;
  onOk?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Specify a function that will be called when a user clicks mask, close button on top right or Cancel button */
  onCancel?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Text of the OK button */
  okText?: React.ReactNode;
  /** Text of the Cancel button */
  cancelText?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const CModal: React.FC<CModalProps> = (p: CModalProps) => {
  // const { loading: loadingCount, setLoading, docModalState } = useLoading();

  return (
    <Modal
      title={p.title}
      open={p.open}
      onCancel={p.onCancel}
      okText={p.okText}
      cancelText={p.cancelText}
      style={{ ...p.style }}
      styles={{ footer: { bottom: 0, position: "absolute" } }}
      className={p.className + ` !my-auto !min-w-full sm:!w-screen lg:!w-3/4
        lg:!my-20 lg:!min-w-auto xl:!w-2/3 2xl:!w-1/2 !top-0 lg:!top-20 !mx-auto
        !p-0 lg:!p-20`}
      classNames={{
        content: "min-h-screen lg:min-h-60 xl:min-h-75 2xl:xl-min-h-90 !rounded-none lg:!rounded-md",
        footer: "mb-8"
      }}
    >
      {p.children}
    </Modal>
  )
}

export default CModal;