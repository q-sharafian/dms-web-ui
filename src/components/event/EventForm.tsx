/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Button, Space, FormInstance } from "antd";
import TextArea from "antd/es/input/TextArea";
import JobPositionField from "../job-position/JobPositionField";
import { t } from "@/lib/utils";
import useCUPStorage from "@/hooks/useClientStorage";
import { LSFieldKey } from "@/interfaces/clientStorageData";
import { Event } from "@/lib/api/services/EventService";
import { useEffect } from "react";

interface EventFormProps {
  dict: any
  className?: string
  /** Default job position ID. Don't use it with defaultEvent prop */
  jpID?: string
  onFinish?: (values: any) => void
  form?: FormInstance<any>
  loading: boolean
  defaultEvent?: Event
  /** If true, the entire form is disabled */
  disabled?: boolean
  /** Hide the form buttons */
  hideButtons?: boolean
}
const EventForm = ({ dict, onFinish, form, loading, jpID, disabled, defaultEvent,
  hideButtons, className }: EventFormProps) => {
  hideButtons = false
  // const [selectedJP, setJP] = useState<string | null>(null);
  const [userID,] = useCUPStorage(LSFieldKey.userID, "")
  useEffect(() => {
    if (defaultEvent != null) {
      form?.setFieldsValue(defaultEvent)
    }
  }, [defaultEvent, form])

  return (
    <Form
      form={form}
      name="basic"
      disabled={disabled}
      labelCol={{ sm: { span: 8, offset: 0 } }}
      labelWrap={true}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      clearOnDestroy={true}
      scrollToFirstError={true}
      labelAlign="left"
      onFinish={onFinish}
      autoComplete="off"
      className={className}
    >
      <Form.Item
        label={t(dict?.common?.jobPosition)}
        name="created_by"
        className="!mt-10"
        initialValue={jpID}
        rules={[{ required: true, message: t(dict?.common?.valueOfIsRequired, dict?.common?.jobPosition) }]}
      >
        <JobPositionField
          dict={dict}
          userID={userID}
        />
      </Form.Item>

      <Form.Item
        className="!mt-10"
        label={t(dict?.common?.nameOf, dict?.common?.event)}
        name="name"
        rules={[{ required: true, message: t(dict?.common?.valueOfIsRequired, dict?.common?.name) }]}
      >
        <Input placeholder={t(dict?.common?.nameOf, dict?.common?.event)} />
      </Form.Item>

      <Form.Item
        className="!mt-10"
        label={t(dict?.common?.descriptionOf, dict?.common?.event)}
        name="description"
        rules={[{ required: false }]}
      >
        <TextArea
          placeholder={t(dict?.common?.descriptionOf, dict?.common?.event)}
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </Form.Item>

      {!hideButtons && <Form.Item className="!mt-10">
        <Space>
          <Button type="primary" htmlType="submit" loading={loading} iconPosition="end">
            {t(dict?.common?.create)}
          </Button>
        </Space>
      </Form.Item>}
    </Form>
  );
};

export default EventForm;

