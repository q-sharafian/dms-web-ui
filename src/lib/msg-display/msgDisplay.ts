import { message } from 'antd';
import { isRunOnServer } from '../utils';

/**
 * A custom message displayer
 */
export const messageHandler = () => {
  const success = (msg: string) => { if (!isRunOnServer()) message.success(msg); }
  const error = (msg: string) => { if (!isRunOnServer()) message.error(msg); }
  const warning = (msg: string) => { if (!isRunOnServer()) message.warning(msg); }
  const info = (msg: string) => { if (!isRunOnServer()) message.info(msg); }
  const loading = (msg: string) => { if (!isRunOnServer()) message.loading(msg); }

  return { success, error, warning, info, loading };
};