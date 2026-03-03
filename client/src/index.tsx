import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { Setting } from './const';
import { offers } from './mocks/offers';
import { offersList } from './mocks/offers-list';
import { favoriteOffers } from './mocks/favorite-offers';
import { store } from './components/store';
import { ErrorMessage } from './components/error-message/error-message';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ErrorMessage />
            <App
                rentalOffersCount={Setting.rentOffersCount}
                offers={offers}
                offersList={offersList}
                favoriteOffers={favoriteOffers}
            />
        </Provider>
    </React.StrictMode>
);