import { Message } from './Message';

export const parseMessage = <T>(message: string): [Message, T | null] => {
  const parts = message.split('|');
  try {
    const payload = JSON.parse(parts[1]);
    return [parts[0] as Message, payload];
  } catch {
    return [Message.Error, null];
  }
};
