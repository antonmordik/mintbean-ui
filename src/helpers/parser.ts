import { Message } from './Message';

export const parseMessage = (message: string): [Message, Record<string, unknown> | null] => {
  const parts = message.split('|');
  try {
    const payload = JSON.parse(parts[1]);
    return [parts[0] as Message, payload];
  } catch {
    return [Message.Error, null];
  }
};
