import { createAction } from '@reduxjs/toolkit';
import type { CityOffer, OffersList } from '../../types/offer';
import type { SortOffer } from '../../types/sort';
import type { AuthorizationStatusType } from '../../types/authorization-status';

export const changeCity = createAction('offers/changeCity', (city: CityOffer) => ({
    payload: city
}));

export const offersCityList = createAction('offers/offersCityList', (offers: OffersList[]) => ({
    payload: offers
}));

export const changeSortType = createAction('offers/changeSortType', (sortType: SortOffer) => ({
    payload: sortType
}));

export const requireAuthorization = createAction('user/requireAuthorization', (status: AuthorizationStatusType) => ({
    payload: status
}));

export const logout = createAction('user/logout');

export const toggleFavorite = createAction('offers/toggleFavorite', (offerId: string) => ({
    payload: offerId
}));

export const setError = createAction<string | null>('setError');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');