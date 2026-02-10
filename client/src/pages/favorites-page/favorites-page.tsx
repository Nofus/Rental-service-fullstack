import { Header } from '../../components/header/header';
import { FavoriteCardList } from '../../components/favorite-card-list/favorite-card-list';
import { Link } from 'react-router-dom';
import type { OffersList } from '../../types/offer';

type FavoritesPageProps = {
    favoriteOffers: OffersList[];
}

function FavoritesPage({ favoriteOffers }: FavoritesPageProps) {
    const offersByCity = favoriteOffers.reduce((acc, offer) => {
        const cityName = offer.city.name;
        if (!acc[cityName]) {
            acc[cityName] = [];
        }
        acc[cityName].push(offer);
        return acc;
    }, {} as Record<string, typeof favoriteOffers>);

    return (
        <div className="page">
            <Header />
            
            <main className="page__main page__main--favorites">
                <div className="page__favorites-container container">
                    <section className="favorites">
                        <h1 className="favorites__title">Saved listing</h1>
                        <ul className="favorites__list">
                            {Object.entries(offersByCity).map(([cityName, cityOffers]) => (
                                <li key={cityName} className="favorites__locations-items">
                                    <div className="favorites__locations locations locations--current">
                                        <div className="locations__item">
                                            <Link className="locations__item-link" to={`/?city=${cityName}`}>
                                                <span>{cityName}</span>
                                            </Link>
                                        </div>
                                    </div>
                                    <FavoriteCardList offers={cityOffers} />
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </main>
            <footer className="footer container">
                <Link className="footer__logo-link" to="/">
                    <img className="footer__logo" src="/img/logo.svg" alt="Rent service logo" width="64" height="33" />
                </Link>
            </footer>
        </div>
    );
}

export { FavoritesPage };