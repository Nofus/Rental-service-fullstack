import { Link } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { changeCity } from '../store/action';
import { AppRoute, CITIES_LOCATION } from '../../const';
import type { CityOffer } from '../../types/offer';

type CitiesListProps = {
    selectedCity: CityOffer | undefined;
}

function CitiesList({ selectedCity }: CitiesListProps) {
    const dispatch = useAppDispatch();

    return (
        <ul className="locations__list tabs__list">
            {CITIES_LOCATION.map((city) => (
                <li key={city.name} className="locations__item">
                    <Link 
                        className={`locations__item-link tabs__item ${city.name === selectedCity?.name ? 'tabs__item--active' : ''}`}
                        to={AppRoute.Main}
                        onClick={() => {
                            dispatch(changeCity(city));
                        }}
                    >
                        <span>{city.name}</span>
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export { CitiesList };