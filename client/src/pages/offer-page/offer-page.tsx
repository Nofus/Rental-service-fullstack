import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Header } from '../../components/header/header';
import type { FullOffer, OffersList } from '../../types/offer';
import { NotFound } from '../../components/not-found/not-found';
import { ReviewsForm } from '../../components/reviews-form/reviews-form';
import { ReviewsList } from '../../components/reviews-list/reviews-list';
import { Map } from '../../components/map/map';
import { CitiesCardList } from '../../components/cities-card-list/cities-card-list';
import { LoadingPage } from '../../components/loading-page/loading-page';
import { useAppSelector, useAppDispatch } from '../../components/hooks';
import { fetchOfferAction, fetchOfferCommentsAction } from '../../components/store/api-actions';
import { AuthorizationStatus } from '../../const';

function OfferPage() {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = params;
    
    const [hoveredOfferId, setHoveredOfferId] = useState<string | undefined>(undefined);
    
   
    const currentOffer = useAppSelector((state) => state.currentOffer);
    const comments = useAppSelector((state) => state.currentOfferComments);
    const isOfferLoading = useAppSelector((state) => state.isOfferLoading);
    const allOffers = useAppSelector((state) => state.offers);
    const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
    const isAuth = authorizationStatus === AuthorizationStatus.Auth;

    useEffect(() => {
        if (id) {
            
            dispatch(fetchOfferAction(id))
                .unwrap()
                .catch(() => {
                    
                    navigate('/404');
                });
            
            
            dispatch(fetchOfferCommentsAction(id));
        }

        
        return () => {
            
        };
    }, [id, dispatch, navigate]);

    if (isOfferLoading) {
        return <LoadingPage />;
    }

    if (!currentOffer) {
        return <NotFound />;
    }

    
    const nearbyOffers = allOffers
        .filter(item => item.id !== id && item.city.name === currentOffer.city.name)
        .slice(0, 3);

    
    const mapOffers: OffersList[] = [
        {
            id: currentOffer.id,
            title: currentOffer.title,
            type: currentOffer.type,
            price: currentOffer.price,
            city: currentOffer.city,
            location: currentOffer.location,
            isFavorite: currentOffer.isFavorite,
            isPremium: currentOffer.isPremium,
            rating: currentOffer.rating,
            previewImage: currentOffer.photos?.[0] || ''
        },
        ...nearbyOffers
    ];

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
                            {currentOffer.photos?.map((photo, index) => (
                            <div key={`${photo}-${index}`} className="offer__image-wrapper">
                                <img className="offer__image" src={photo} alt="Photo studio" />
                            </div>
                            ))}
                        </div>
                    </div>
                    <div className="offer__container container">
                        <div className="offer__wrapper">
                            {currentOffer.isPremium && (
                                <div className="offer__mark">
                                    <span>Premium</span>
                                </div>
                            )}
                            <div className="offer__name-wrapper">
                                <h1 className="offer__name">{currentOffer.title}</h1>
                                <button className={`offer__bookmark-button ${currentOffer.isFavorite ? 'offer__bookmark-button--active' : ''} button`} type="button">
                                    <svg className="offer__bookmark-icon" width="31" height="33">
                                        <use href="#icon-bookmark"></use>
                                    </svg>
                                    <span className="visually-hidden">To bookmarks</span>
                                </button>
                            </div>
                            <div className="offer__rating rating">
                                <div className="offer__stars rating__stars">
                                    <span style={{width: `${currentOffer.rating * 20}%`}}></span>
                                    <span className="visually-hidden">Rating</span>
                                </div>
                                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
                            </div>
                            <ul className="offer__features">
                                <li className="offer__feature offer__feature--entire">
                                    {currentOffer.type}
                                </li>
                                <li className="offer__feature offer__feature--bedrooms">
                                    {currentOffer.bedrooms} Bedrooms
                                </li>
                                <li className="offer__feature offer__feature--adults">
                                    Max {currentOffer.maxAdults} adults
                                </li>
                            </ul>
                            <div className="offer__price">
                                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                                <span className="offer__price-text">&nbsp;night</span>
                            </div>
                            <div className="offer__inside">
                                <h2 className="offer__inside-title">What&apos;s inside</h2>
                                <ul className="offer__inside-list">
                                    {currentOffer.goods?.map((good) => (
                                        <li key={good} className="offer__inside-item">
                                            {good}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="offer__host">
                                <h2 className="offer__host-title">Meet the host</h2>
                                <div className="offer__host-user user">
                                    <div className={`offer__avatar-wrapper ${currentOffer.host?.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                                        <img 
                                            className="offer__avatar user__avatar" 
                                            src={currentOffer.host?.avatarUrl || '/img/avatar.svg'} 
                                            width="74" 
                                            height="74" 
                                            alt="Host avatar"
                                        />
                                    </div>
                                    <span className="offer__user-name">{currentOffer.host?.name}</span>
                                    {currentOffer.host?.isPro && (
                                        <span className="offer__user-status">Pro</span>
                                    )}
                                </div>
                                <div className="offer__description">
                                    <p className="offer__text">{currentOffer.description}</p>
                                </div>
                            </div>
                            <section className="offer__reviews reviews">
                                <ReviewsList reviews={comments} />
                                {isAuth && (
                                    <ReviewsForm offerId={id!} />
                                )}
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
                                city={currentOffer.city}
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