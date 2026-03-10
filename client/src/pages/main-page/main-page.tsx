import { useState } from 'react';
import { CitiesCardList } from "../../components/cities-card-list/cities-card-list";
import { Header } from "../../components/header/header";
import { Map } from "../../components/map/map";
import { CitiesList } from '../../components/CitiesList/CitiesList';
import { SortOptions } from '../../components/SortOptions/SortOptions';
import { useAppSelector, useAppDispatch } from '../../components/hooks';
import { changeSortType } from '../../components/store/action';
import { getOffersByCity, sortOffersByType } from '../../utils';
import type { SortOffer } from '../../types/sort';

function MainPage() {
    const dispatch = useAppDispatch();
    const selectedCity = useAppSelector((state) => state.city);
    const offersList = useAppSelector((state) => state.offers);
    const sortType = useAppSelector((state) => state.sortType);
    
    const [selectedOfferId, setSelectedOfferId] = useState<string | undefined>(undefined);
    
    const selectedCityOffers = getOffersByCity(selectedCity?.name, offersList);
    const sortedOffers = sortOffersByType(selectedCityOffers, sortType);
    const rentalOffersCount = selectedCityOffers.length;
    const hasOffers = rentalOffersCount > 0;

    const handleSortChange = (newSorting: SortOffer) => {
        dispatch(changeSortType(newSorting));
    };

    return(
        <div className="page page--gray page--main">
            <Header />
            
            <main className={`page__main page__main--index ${!hasOffers ? 'page__main--index-empty' : ''}`}>
                <h1 className="visually-hidden">Cities</h1>
                <div className="tabs">
                    <section className="locations container">
                        <CitiesList selectedCity={selectedCity} />
                    </section>
                </div>
                <div className="cities">
                    {hasOffers ? (
                        <div className="cities__places-container container">
                            <section className="cities__places places">
                                <h2 className="visually-hidden">Places</h2>
                                <b className="places__found">{rentalOffersCount} places to stay in {selectedCity?.name}</b>
                                <SortOptions 
                                    activeSorting={sortType} 
                                    onChange={handleSortChange} 
                                />
                                <CitiesCardList 
                                    offersList={sortedOffers} 
                                    onOfferHover={setSelectedOfferId}
                                    onOfferLeave={() => setSelectedOfferId(undefined)}
                                />
                            </section>
                            <div className="cities__right-section">
                                <Map 
                                    offers={sortedOffers}
                                    selectedOfferId={selectedOfferId}
                                    city={selectedCity || { 
                                        name: 'Paris', 
                                        location: {
                                            latitude: 48.85661,
                                            longitude: 2.351499,
                                            zoom: 13
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="cities__places-container cities__places-container--empty container">
                            <section className="cities__no-places">
                                <div className="cities__status-wrapper tabs__content">
                                    <b className="cities__status">No places to stay available</b>
                                    <p className="cities__status-description">
                                        We could not find any property available at the moment in {selectedCity?.name || 'Dusseldorf'}
                                    </p>
                                </div>
                            </section>
                            <div className="cities__right-section"></div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export { MainPage };