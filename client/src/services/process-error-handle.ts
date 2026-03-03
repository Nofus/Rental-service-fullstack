import { store } from '../components/store';
import { setError } from '../components/store/action';
import { TIMEOUT_SHOW_ERROR } from '../const';

export const processErrorHandle = (message: string): void => {
  store.dispatch(setError(message));
  
  setTimeout(() => {
    store.dispatch(setError(null));
  }, TIMEOUT_SHOW_ERROR);
};