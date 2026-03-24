import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CitiesCard } from '../components/cities-card/cities-card';
import { makeFakeOffer, makeFakeStore } from './mocks';
import { AppRoute } from '../const';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { reducer } from '../components/store/reducer';

const renderCitiesCard = (props: any, storeOverrides = {}) => {
    const store = configureStore({
        reducer,
        preloadedState: makeFakeStore(storeOverrides),
    });

    return render(
        <Provider store={store}>
            <MemoryRouter>
                <CitiesCard {...props} />
            </MemoryRouter>
        </Provider>
    );
};

describe('CitiesCard', () => {
    it('отображает заголовок объявления', () => {
        const offer = makeFakeOffer();
        renderCitiesCard({ ...offer });
        
        expect(screen.getByText(offer.title)).toBeInTheDocument();
    });

    it('отображает цену объявления', () => {
        const offer = makeFakeOffer();
        renderCitiesCard({ ...offer });
        
        expect(screen.getByText(`€${offer.price}`)).toBeInTheDocument();
    });

    it('отображает метку Premium когда isPremium = true', () => {
        const offer = makeFakeOffer();
        renderCitiesCard({ 
            ...offer, 
            isPremium: true,
        });
        
        expect(screen.getByText(/Premium/i)).toBeInTheDocument();
    });

    it('не отображает метку Premium когда isPremium = false', () => {
        const offer = makeFakeOffer();
        renderCitiesCard({ 
            ...offer, 
            isPremium: false,
        });
        
        expect(screen.queryByText(/Premium/i)).not.toBeInTheDocument();
    });

    it('ссылка на страницу объявления содержит id в href (/offer/id)', () => {
        const offer = makeFakeOffer();
        renderCitiesCard({ ...offer });
        
        const link = screen.getByRole('link', { name: offer.title });
        const expectedPath = AppRoute.Offer.replace(':id', offer.id);
        expect(link).toHaveAttribute('href', expectedPath);
    });
});