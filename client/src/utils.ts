import type { CityOffer, OffersList } from './types/offer';
import type { SortOffer } from './types/sort';
import { CITIES_LOCATION, SortOffersType } from './const';

export function getCity(cityName: string, cities: readonly CityOffer[]): CityOffer {
    const city = cities.find((item) => item.name === cityName);
    if (!city) {
        return cities[0];
    }
    return city;
}

export function getOffersByCity(cityName: string | undefined, offers: OffersList[]): OffersList[] {
    if (!cityName) {
        return [];
    }
    return offers.filter((offer) => offer.city.name === cityName);
}

export function sortOffersByType(offers: OffersList[], type: SortOffer): OffersList[] {
    const offersCopy = [...offers];
    
    switch (type) {
        case 'PriceToHigh':
            return offersCopy.sort((a, b) => a.price - b.price);
        case 'PriceToLow':
            return offersCopy.sort((a, b) => b.price - a.price);
        case 'TopRated':
            return offersCopy.sort((a, b) => b.rating - a.rating);
        default:
            return offersCopy;
    }
}