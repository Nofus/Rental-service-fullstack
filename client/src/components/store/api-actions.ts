import type { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '../../types/state.js';
import type { OffersList } from '../../types/offer';
import { 
    offersCityList, 
    requireAuthorization, 
    setError,
    setOffersDataLoadingStatus 
} from './action';
import { saveToken, dropToken } from '../../services/token';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../../const';
import type { AuthData, UserData } from '../../types/user-data';
import { store } from './index';

export const clearErrorAction = createAsyncThunk(
  'clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    try {
      const { data } = await api.get<OffersList[]>(APIRoute.Offers);
      dispatch(offersCityList(data));
    } catch (error) {
      dispatch(setError('Не удалось загрузить предложения'));
      dispatch(clearErrorAction());
    } finally {
      dispatch(setOffersDataLoadingStatus(false));
    }
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
      saveToken(data.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (err) {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      dispatch(setError('Ошибка авторизации'));
      dispatch(clearErrorAction());
      return rejectWithValue('Login failed');
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch (error) {
      dispatch(setError('Ошибка при выходе из системы'));
      dispatch(clearErrorAction());
    }
  },
);