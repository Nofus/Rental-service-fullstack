import { FavoriteCard } from '../favorite-card/favorite-card';
import type { OffersList } from '../../types/offer';

type FavoriteCardListProps = {
    offers: OffersList[];
}

function FavoriteCardList({ offers }: FavoriteCardListProps) {
    return (
        <div className="favorites__places">
            {offers.map((offer) => (
                <FavoriteCard 
                    key={offer.id}
                    id={offer.id}
                    title={offer.title}
                    type={offer.type}
                    price={offer.price}
                    previewImage={offer.previewImage}
                    isPremium={offer.isPremium}
                    rating={offer.rating}
                    isFavorite={offer.isFavorite}
                />
            ))}
        </div>
    );
}

export { FavoriteCardList }