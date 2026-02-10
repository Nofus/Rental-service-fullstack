import type { CityOffer, OffersList } from '../../types/offer';
import type { SortOffer } from '../../types/sort';
import { AuthorizationStatus } from '../../const';

export type State = {
    city: CityOffer;
    offers: OffersList[];
    sortType: SortOffer;
    authorizationStatus: typeof AuthorizationStatus[keyof typeof AuthorizationStatus];
    userEmail: string | null;
};