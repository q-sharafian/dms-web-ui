import { MsgTypes } from '@/interfaces/msgType';
import { messageHandler } from '@/lib/msg-display/msgDisplay';

/**
 * A custom message displayer
 */
export const useCMessage = () => {
  const { error, info, loading, success, warning } = messageHandler()
  const showMsg = (type: MsgTypes, message: string) => {
    switch (type) {
      case 'success':
        success(message);
        break;
      case 'error':
        error(message);
        break;
      case 'warn':
        warning(message);
        break;
      case 'info':
        info(message);
        break;
      case 'loading':
        loading(message);
        break;
      default:
        throw new Error(`Unknown message type: ${type}`);
    }
  }
  return { showMsg };
};
