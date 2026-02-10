import { CitiesCard } from '../cities-card/cities-card';
import type { OffersList } from '../../types/offer';

type CitiesCardListProps = {
    offersList: OffersList[];
    onOfferHover?: (id: string) => void;
    onOfferLeave?: () => void;
};

function CitiesCardList({ offersList, onOfferHover, onOfferLeave }: CitiesCardListProps) {
    return (
        <div className="cities__places-list places__list tabs__content">
            {offersList.map((item) => (
                <CitiesCard 
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    type={item.type}
                    price={item.price}
                    previewImage={item.previewImage}
                    isPremium={item.isPremium}
                    rating={item.rating}
                    isFavorite={item.isFavorite}
                    onOfferHover={onOfferHover}
                    onOfferLeave={onOfferLeave}
                />
            ))}
        </div>
    );
}

export { CitiesCardList };