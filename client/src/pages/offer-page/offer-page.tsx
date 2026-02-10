import { useParams } from 'react-router-dom';
import { Header } from '../../components/header/header';
import type { FullOffer, OffersList } from '../../types/offer';
import { NotFound } from '../../components/not-found/not-found';
import { ReviewsForm } from '../../components/reviews-form/reviews-form';
import { ReviewsList } from '../../components/reviews-list/reviews-list';
import { Map } from '../../components/map/map';
import { CitiesCardList } from '../../components/cities-card-list/cities-card-list';
import { reviews } from '../../mocks/reviews';
import { useState } from 'react';

type OfferPageProps = {
    offers: FullOffer[];
}

function OfferPage({ offers }: OfferPageProps) {
    const params = useParams();
    const { id } = params;
    const [hoveredOfferId, setHoveredOfferId] = useState<string | undefined>(undefined);
    
    if (!id) {
        return <NotFound />;
    }

    const offer = offers.find((item) => item.id === id);
    
    if (!offer) {
        return <NotFound />;
    }

    const convertToOffersList = (fullOffers: FullOffer[]): OffersList[] => {
        return fullOffers.map(item => ({
            id: item.id,
            title: item.title,
            type: item.type,
            price: item.price,
            city: item.city,
            location: item.location,
            isFavorite: item.isFavorite,
            isPremium: item.isPremium,
            rating: item.rating,
            previewImage: item.images[0] || ''
        }));
    };

    const nearbyFullOffers = offers
        .filter(item => item.id !== id && item.city.name === offer.city.name)
        .slice(0, 3);
    
    const allOffersForMap = [offer, ...nearbyFullOffers];
    const nearbyOffers = convertToOffersList(nearbyFullOffers);
    const mapOffers = convertToOffersList(allOffersForMap);

    const handleOfferHover = (offerId: string) => {
        setHoveredOfferId(offerId);
    };

    const handleOfferLeave = () => {
        setHoveredOfferId(undefined);
    };

    return (
        <div className="page">
            <Header />
            
            <main className="page__main page__main--offer">
                <section className="offer">
                    <div className="offer__gallery-container container">
                        <div className="offer__gallery">
                            {offer.images.map((image, index) => (
                                <div key={`${image}-${index}`} className="offer__image-wrapper">
                                    <img className="offer__image" src={image} alt="Photo studio" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="offer__container container">
                        <div className="offer__wrapper">
                            {offer.isPremium && (
                                <div className="offer__mark">
                                    <span>Premium</span>
                                </div>
                            )}
                            <div className="offer__name-wrapper">
                                <h1 className="offer__name">{offer.title}</h1>
                                <button className={`offer__bookmark-button ${offer.isFavorite ? 'offer__bookmark-button--active' : ''} button`} type="button">
                                    <svg className="offer__bookmark-icon" width="31" height="33">
                                        <use href="#icon-bookmark"></use>
                                    </svg>
                                    <span className="visually-hidden">To bookmarks</span>
                                </button>
                            </div>
                            <div className="offer__rating rating">
                                <div className="offer__stars rating__stars">
                                    <span style={{width: `${offer.rating * 20}%`}}></span>
                                    <span className="visually-hidden">Rating</span>
                                </div>
                                <span className="offer__rating-value rating__value">{offer.rating}</span>
                            </div>
                            <ul className="offer__features">
                                <li className="offer__feature offer__feature--entire">
                                    {offer.type}
                                </li>
                                <li className="offer__feature offer__feature--bedrooms">
                                    {offer.bedrooms} Bedrooms
                                </li>
                                <li className="offer__feature offer__feature--adults">
                                    Max {offer.maxAdults} adults
                                </li>
                            </ul>
                            <div className="offer__price">
                                <b className="offer__price-value">&euro;{offer.price}</b>
                                <span className="offer__price-text">&nbsp;night</span>
                            </div>
                            <div className="offer__inside">
                                <h2 className="offer__inside-title">What&apos;s inside</h2>
                                <ul className="offer__inside-list">
                                    {offer.goods.map((good) => (
                                        <li key={good} className="offer__inside-item">
                                            {good}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="offer__host">
                                <h2 className="offer__host-title">Meet the host</h2>
                                <div className="offer__host-user user">
                                    <div className={`offer__avatar-wrapper ${offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                                        <img 
                                            className="offer__avatar user__avatar" 
                                            src={offer.host.avatarUrl} 
                                            width="74" 
                                            height="74" 
                                            alt="Host avatar"
                                        />
                                    </div>
                                    <span className="offer__user-name">{offer.host.name}</span>
                                    {offer.host.isPro && (
                                        <span className="offer__user-status">Pro</span>
                                    )}
                                </div>
                                <div className="offer__description">
                                    <p className="offer__text">{offer.description}</p>
                                </div>
                            </div>
                            <section className="offer__reviews reviews">
                                <ReviewsList reviews={reviews} />
                                <ReviewsForm 
                                    onSubmit={(rating, comment) => {
                                        console.log('Отправлен отзыв:', { rating, comment });
                                    }}
                                />
                            </section>
                        </div>
                    </div>
                    <section className="offer__map map">
                        <div className="offer__map-container" style={{ 
                            width: '1144px', 
                            margin: '0 auto', 
                            height: '500px' 
                        }}>
                            <Map 
                                offers={mapOffers}
                                selectedOfferId={hoveredOfferId}
                                activeOfferId={id}
                                city={offer.city}
                                className="offer__map"
                            />
                        </div>
                    </section>
                </section>
                <div className="container">
                    <section className="near-places places">
                        <h2 className="near-places__title">Other places in the neighbourhood</h2>
                        <div className="near-places__list places__list">
                            <CitiesCardList 
                                offersList={nearbyOffers} 
                                onOfferHover={handleOfferHover}
                                onOfferLeave={handleOfferLeave}
                            />
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export { OfferPage };