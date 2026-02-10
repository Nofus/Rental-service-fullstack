import { createReducer } from '@reduxjs/toolkit';
import { offersList } from '../../mocks/offers-list';
import { getCity } from '../../utils';
import { changeCity, offersCityList, changeSortType, requireAuthorization, logout, toggleFavorite } from './action';
import { CITIES_LOCATION, AuthorizationStatus } from '../../const';
import type { State } from './types';

const defaultCity = getCity('Paris', CITIES_LOCATION);

const initialState: State = {
    city: defaultCity,
    offers: offersList,
    sortType: 'Popular',
    authorizationStatus: AuthorizationStatus.NoAuth,
    userEmail: null
};

const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(changeCity, (state, action) => {
            state.city = action.payload;
        })
        .addCase(offersCityList, (state, action) => {
            state.offers = action.payload;
        })
        .addCase(changeSortType, (state, action) => {
            state.sortType = action.payload;
        })
        .addCase(requireAuthorization, (state, action) => {
            state.authorizationStatus = action.payload.status;
            if (action.payload.email) {
                state.userEmail = action.payload.email;
            }
        })
        .addCase(logout, (state) => {
            state.authorizationStatus = AuthorizationStatus.NoAuth;
            state.userEmail = null;
        })
        .addCase(toggleFavorite, (state, action) => {
            const offerId = action.payload;
            const offerIndex = state.offers.findIndex(offer => offer.id === offerId);
            
            if (offerIndex !== -1) {
                state.offers[offerIndex].isFavorite = !state.offers[offerIndex].isFavorite;
            }
        });
});

export { reducer };