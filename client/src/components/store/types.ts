import type { CityOffer, OffersList } from '../../types/offer';
import type { SortOffer } from '../../types/sort';
import { AuthorizationStatus } from '../../const';
import type { FullOffer } from '../../types/offer';  
import type { Review } from '../../types/review';    

export type State = {
    error: string | null;
    isOffersDataLoading: boolean;
    city: CityOffer;
    offers: OffersList[];
    sortType: SortOffer;
    authorizationStatus: typeof AuthorizationStatus[keyof typeof AuthorizationStatus];
    userEmail: string | null;
    userName: string | null;
    userAvatar: string | null;
    currentOffer: FullOffer | null;
    currentOfferComments: Review[];
    isOfferLoading: boolean;
    isCommentsLoading: boolean;
    favoriteOffers: OffersList[];
    isFavoriteLoading: boolean;
};