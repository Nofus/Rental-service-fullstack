import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage } from "../../pages/main-page/main-page";
import { LoginPage } from "../../pages/login-page/login-page";
import { FavoritesPage } from "../../pages/favorites-page/favorites-page";
import { OfferPage } from "../../pages/offer-page/offer-page";
import { NotFound } from "../not-found/not-found";
import { PrivateRoute } from '../private-route/private-route';
import { AppRoute } from '../../const';
import type { FullOffer, OffersList } from '../../types/offer';
import { useAppSelector, useAppDispatch } from '../hooks';
import { LoadingPage } from '../loading-page/loading-page';
import { AuthorizationStatus } from '../../const';
import { fetchOffersAction, checkAuthAction } from '../store/api-actions';
import { useEffect } from 'react';

type AppMainPageProps = {
    rentalOffersCount: number;
    offers: FullOffer[];
    offersList: OffersList[];
    favoriteOffers: OffersList[]; 
}

function App({rentalOffersCount, offers, offersList, favoriteOffers}: AppMainPageProps) {
    const dispatch = useAppDispatch();
    const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
    const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

    useEffect(() => {
        dispatch(checkAuthAction());
        dispatch(fetchOffersAction());
    }, [dispatch]);

    if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
        return <LoadingPage />;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route 
                    path={AppRoute.Main} 
                    element={<MainPage />}
                />
                <Route 
                    path={AppRoute.Login} 
                    element={<LoginPage />}
                />
                <Route 
                    path={AppRoute.Favorites} 
                    element={
                        <PrivateRoute>
                            <FavoritesPage favoriteOffers={favoriteOffers} />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path={AppRoute.Offer} 
                    element={<OfferPage offers={offers}/>}
                />
                <Route 
                    path="*" 
                    element={<NotFound />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;