import { Message } from './Message';
import { store } from '../store';

export const generateMessage = (type: Message, payload: Record<string, unknown>): string => {
  const token = store.getState().app.token;
  return [type, token, JSON.stringify(payload)].join('|');
};
