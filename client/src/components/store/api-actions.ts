import type { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '../../types/state.js';
import type { OffersList, FullOffer } from '../../types/offer';
import type { Review } from '../../types/review';
import { 
  loadFavoriteOffers,
  loadOffer,
  loadOfferComments,
  logout,
    offersCityList, 
    requireAuthorization, 
    setCommentsLoadingStatus, 
    setError,
    setFavoriteLoadingStatus,
    setOfferLoadingStatus,
    setOffersDataLoadingStatus, 
    toggleFavorite
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
  async (_arg: undefined, { dispatch, extra: api }) => {  
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

export const fetchOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'offer/fetchOffer',
  async (offerId, { dispatch, extra: api }) => {
    dispatch(setOfferLoadingStatus(true));
    try {
      const { data } = await api.get<FullOffer>(`/offers/${offerId}`);
      dispatch(loadOffer(data));
    } catch (error) {
      dispatch(setError('Не удалось загрузить информацию о предложении'));
      dispatch(clearErrorAction());
      throw error;
    } finally {
      dispatch(setOfferLoadingStatus(false));
    }
  },
);

export const fetchOfferCommentsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'offer/fetchComments',
  async (offerId, { dispatch, extra: api }) => {
    dispatch(setCommentsLoadingStatus(true));
    try {
      const { data } = await api.get<Review[]>(`/comments/${offerId}`);
      dispatch(loadOfferComments(data));
    } catch (error) {
      dispatch(setError('Не удалось загрузить комментарии'));
      dispatch(clearErrorAction());
    } finally {
      dispatch(setCommentsLoadingStatus(false));
    }
  },
);

export const fetchFavoriteOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'favorite/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setFavoriteLoadingStatus(true));
    try {
      const { data } = await api.get<OffersList[]>('/favorite');
      dispatch(loadFavoriteOffers(data));
    } catch (error) {
      dispatch(setError('Не удалось загрузить избранные предложения'));
      dispatch(clearErrorAction());
    } finally {
      dispatch(setFavoriteLoadingStatus(false));
    }
  },
);

export const toggleFavoriteAction = createAsyncThunk<void, { offerId: string; status: number }, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'favorite/toggle',
  async ({ offerId, status }, { dispatch, extra: api }) => {
    try {
      
      const { data } = await api.post<OffersList>(`/favorite/${offerId}/${status}`);
      
      
      dispatch(toggleFavorite(offerId));
      
      
      dispatch(fetchFavoriteOffersAction());
      
    } catch (error) {
      dispatch(setError('Не удалось изменить статус избранного'));
      dispatch(clearErrorAction());
      throw error;
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
      const { data } = await api.get<UserData>(APIRoute.Login);
      dispatch(requireAuthorization(
        AuthorizationStatus.Auth, 
        { 
          email: data.email,
          name: data.username,  
          avatarUrl: data.avatarUrl || null 
        }
      ));
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
  async ({ email, password }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
      saveToken(data.token);
     
      dispatch(requireAuthorization(
        AuthorizationStatus.Auth,
        { 
          email: data.email,
          name: data.username, 
          avatarUrl: data.avatarUrl || null 
        }
      ));
    } catch (err) {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      dispatch(setError('Ошибка авторизации'));
      dispatch(clearErrorAction());
      throw err;
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
      dispatch(logout());
    } catch (error) {
      dispatch(setError('Ошибка при выходе из системы'));
      dispatch(clearErrorAction());
    }
  },
);

export const postCommentAction = createAsyncThunk<void, { offerId: string; rating: number; comment: string }, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'comments/postComment',
  async ({ offerId, rating, comment }, { dispatch, extra: api }) => {
    try {
      await api.post<Review>(`/comments/${offerId}`, {
        comment,
        rating
      });
      
     
      dispatch(fetchOfferCommentsAction(offerId));
      
      
    } catch (error) {
      dispatch(setError('Не удалось отправить комментарий'));
      dispatch(clearErrorAction());
      throw error;
    }
  },
);
