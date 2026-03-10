import { createReducer } from '@reduxjs/toolkit';
import { getCity } from '../../utils';
import { changeCity, offersCityList, changeSortType, requireAuthorization, logout, toggleFavorite, setError, setOffersDataLoadingStatus } from './action';
import { CITIES_LOCATION, AuthorizationStatus } from '../../const';
import type { State } from './types';
import { loadOffer, loadOfferComments, setOfferLoadingStatus, setCommentsLoadingStatus } from './action';
import { loadFavoriteOffers, setFavoriteLoadingStatus } from './action';

const defaultCity = getCity('Paris', CITIES_LOCATION);

const initialState: State = {
    city: defaultCity,
    offers: [],
    sortType: 'Popular',
    authorizationStatus: AuthorizationStatus.Unknown,
    userEmail: null,
    userAvatar: null,
    error: null,
    isOffersDataLoading: false,
    userName: null,
    currentOffer: null,
    currentOfferComments: [],
    isOfferLoading: false,
    isCommentsLoading: false,
    favoriteOffers: [],
    isFavoriteLoading: false
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
            const { status, user } = action.payload;
            state.authorizationStatus = status;
            
            if (user) {
                state.userEmail = user.email;
                state.userName = user.name;  
                state.userAvatar = user.avatarUrl;
            } else {
                state.userEmail = null;
                state.userName = null;        
                state.userAvatar = null;
            }
        })
        .addCase(logout, (state) => {
            state.authorizationStatus = AuthorizationStatus.NoAuth;
            state.userEmail = null;
            state.userAvatar = null; 
        })
        .addCase(toggleFavorite, (state, action) => {
            const offerId = action.payload;
            const offerIndex = state.offers.findIndex(offer => offer.id === offerId);
            
            if (offerIndex !== -1) {
                state.offers[offerIndex].isFavorite = !state.offers[offerIndex].isFavorite;
            }
        })
        .addCase(setError, (state, action) => {
            state.error = action.payload;
        })
        .addCase(setOffersDataLoadingStatus, (state, action) => {
            state.isOffersDataLoading = action.payload;
        })
        .addCase(loadOffer, (state, action) => {
        state.currentOffer = action.payload;
        })
        .addCase(loadOfferComments, (state, action) => {
            state.currentOfferComments = action.payload;
        })
        .addCase(setOfferLoadingStatus, (state, action) => {
            state.isOfferLoading = action.payload;
        })
        .addCase(setCommentsLoadingStatus, (state, action) => {
            state.isCommentsLoading = action.payload;
        })
        .addCase(loadFavoriteOffers, (state, action) => {
            state.favoriteOffers = action.payload;
        })
        .addCase(setFavoriteLoadingStatus, (state, action) => {
            state.isFavoriteLoading = action.payload;
        });
});

export { reducer };