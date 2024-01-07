import { SHOW_LOGS } from '@modules/config';

export const logit = message => {
  if (SHOW_LOGS) {
    // eslint-disable-next-line no-console
    console.log(message);
  }
};
