import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../components/hooks';
import { toggleFavorite } from '../../components/store/action';
import { AuthorizationStatus } from '../../const';

type CitiesCardProps = {
    id: string;
    title: string;
    type: string;
    price: number;
    previewImage: string;
    isPremium: boolean;
    rating: number;
    isFavorite: boolean;
    onOfferHover?: (id: string) => void;
    onOfferLeave?: () => void;
}

function CitiesCard({ id, title, type, price, previewImage, isPremium, rating, isFavorite, onOfferHover, onOfferLeave }: CitiesCardProps) {
    const dispatch = useAppDispatch();

    const handleMouseOver = () => {
        if (onOfferHover) {
            onOfferHover(id);
        }
    };

    const handleMouseOut = () => {
        if (onOfferLeave) {
            onOfferLeave();
        }
    };

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(toggleFavorite(id));
    };

    return (
        <article 
            className="cities__card place-card" 
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            {isPremium && (
                <div className="place-card__mark">
                    <span>Premium</span>
                </div>
            )}
            <div className="cities__image-wrapper place-card__image-wrapper">
                <Link to={`${AppRoute.Offer.replace(':id', id)}`}>
                    <img 
                        className="place-card__image" 
                        src={previewImage} 
                        width="260" 
                        height="200" 
                        alt="Place image"
                    />
                </Link>
            </div>
            <div className="place-card__info">
                <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                        <b className="place-card__price-value">&euro;{price}</b>
                        <span className="place-card__price-text">&#47;&nbsp;night</span>
                    </div>
                    <button className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`} type="button">
                        <svg className="place-card__bookmark-icon" width="18" height="19">
                            <use href="/img/sprite.svg#icon-bookmark"></use>

                        </svg>
                        <span className="visually-hidden">To bookmarks</span>
                    </button>
                </div>
                <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                        <span style={{width: `${rating * 20}%`}}></span>
                        <span className="visually-hidden">Rating</span>
                    </div>
                </div>
                <h2 className="place-card__name">
                    <Link to={`${AppRoute.Offer.replace(':id', id)}`}>{title}</Link>
                </h2>
                <p className="place-card__type">{type}</p>
            </div>
        </article>
    );
}

export { CitiesCard };