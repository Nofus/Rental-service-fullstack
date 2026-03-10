import { createAction } from '@reduxjs/toolkit';
import type { CityOffer, FullOffer, OffersList } from '../../types/offer';
import type { SortOffer } from '../../types/sort';
import type { AuthorizationStatusType } from '../../types/authorization-status';
import type { Review } from '../../types/review';

export const changeCity = createAction('offers/changeCity', (city: CityOffer) => ({
    payload: city
}));

export const offersCityList = createAction('offers/offersCityList', (offers: OffersList[]) => ({
    payload: offers
}));

export const changeSortType = createAction('offers/changeSortType', (sortType: SortOffer) => ({
    payload: sortType
}));

export const requireAuthorization = createAction(
  'user/requireAuthorization', 
  (status: AuthorizationStatusType, user?: { 
    email: string; 
    name: string;      
    avatarUrl: string | null;
  }) => ({
    payload: { status, user }
  })
);

export const logout = createAction('user/logout');

export const toggleFavorite = createAction('offers/toggleFavorite', (offerId: string) => ({
    payload: offerId
}));

export const setError = createAction<string | null>('setError');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const loadOffer = createAction<FullOffer>('offer/loadOffer');

export const loadOfferComments = createAction<Review[]>('offer/loadOfferComments');

export const setOfferLoadingStatus = createAction<boolean>('offer/setOfferLoadingStatus');

export const setCommentsLoadingStatus = createAction<boolean>('offer/setCommentsLoadingStatus');

export const loadFavoriteOffers = createAction<OffersList[]>('favorite/loadFavoriteOffers');

export const setFavoriteLoadingStatus = createAction<boolean>('favorite/setFavoriteLoadingStatus');

