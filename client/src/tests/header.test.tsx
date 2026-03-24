import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { Header } from '../components/header/header';
import { renderWithProviders } from './render-with-providers';
import { AppRoute, AuthorizationStatus } from '../const';
import { makeFakeOffer } from './mocks';

describe('Header - неавторизованный пользователь', () => {
    it('отображает ссылку Sign in', () => {
        renderWithProviders(<Header />, {
            storeOverrides: {
                authorizationStatus: AuthorizationStatus.NoAuth,
            },
        });
        expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    });

    it('ссылка Sign in ведет на страницу авторизации', () => {
        renderWithProviders(<Header />, {
            storeOverrides: {
                authorizationStatus: AuthorizationStatus.NoAuth,
            },
        });
        const signInLink = screen.getByRole('link', { name: /sign in/i });
        expect(signInLink).toHaveAttribute('href', AppRoute.Login);
    });

    it('не отображает Sign out', () => {
        renderWithProviders(<Header />, {
            storeOverrides: {
                authorizationStatus: AuthorizationStatus.NoAuth,
            },
        });
        expect(screen.queryByText(/sign out/i)).not.toBeInTheDocument();
    });

    it('не отображает имя пользователя', () => {
        renderWithProviders(<Header />, {
            storeOverrides: {
                authorizationStatus: AuthorizationStatus.NoAuth,
                userEmail: null,
                userName: null,
            },
        });
        expect(screen.queryByText(/User/)).not.toBeInTheDocument();
    });
});

describe('Header - авторизованный пользователь', () => {
    it('отображает Sign out', () => {
        renderWithProviders(<Header />, {
            storeOverrides: {
                authorizationStatus: AuthorizationStatus.Auth,
                userEmail: 'test@example.com',
                userName: 'Test User',
            },
        });
        expect(screen.getByText(/sign out/i)).toBeInTheDocument();
    });

    it('ссылка Sign out ведет на главную страницу', () => {
        renderWithProviders(<Header />, {
            storeOverrides: {
                authorizationStatus: AuthorizationStatus.Auth,
                userEmail: 'test@example.com',
            },
        });
        const signOutLink = screen.getByRole('link', { name: /sign out/i });
        expect(signOutLink).toHaveAttribute('href', AppRoute.Main);
    });

    it('не отображает Sign in', () => {
        renderWithProviders(<Header />, {
            storeOverrides: {
                authorizationStatus: AuthorizationStatus.Auth,
                userEmail: 'test@example.com',
                userName: 'Test User',
            },
        });
        expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
    });

    it('отображает имя пользователя', () => {
        renderWithProviders(<Header />, {
            storeOverrides: {
                authorizationStatus: AuthorizationStatus.Auth,
                userEmail: 'test@example.com',
                userName: 'Test User',
            },
        });
        expect(screen.getByText('Test User')).toBeInTheDocument();
    });

    it('отображает email если userName отсутствует', () => {
        renderWithProviders(<Header />, {
            storeOverrides: {
                authorizationStatus: AuthorizationStatus.Auth,
                userEmail: 'test@example.com',
                userName: null,
            },
        });
        expect(screen.getByText('test')).toBeInTheDocument();
    });

    it('отображает количество избранных предложений', () => {
        const favoriteOffers = [makeFakeOffer(), makeFakeOffer()];
        const offersWithFavorites = favoriteOffers.map(offer => ({
            ...offer,
            isFavorite: true
        }));
        
        renderWithProviders(<Header />, {
            storeOverrides: {
                authorizationStatus: AuthorizationStatus.Auth,
                offers: offersWithFavorites,
                userEmail: 'test@example.com',
            },
        });
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('отображает 0, если избранных нет', () => {
        renderWithProviders(<Header />, {
            storeOverrides: {
                authorizationStatus: AuthorizationStatus.Auth,
                offers: [],
                userEmail: 'test@example.com',
            },
        });
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('ссылка на профиль ведет на страницу избранного', () => {
        renderWithProviders(<Header />, {
            storeOverrides: {
                authorizationStatus: AuthorizationStatus.Auth,
                userEmail: 'test@example.com',
            },
        });
        const profileLink = screen.getByRole('link', { name: /test/i });
        expect(profileLink).toHaveAttribute('href', AppRoute.Favorites);
    });
});