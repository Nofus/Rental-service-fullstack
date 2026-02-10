import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage } from "../../pages/main-page/main-page";
import { LoginPage } from "../../pages/login-page/login-page";
import { FavoritesPage } from "../../pages/favorites-page/favorites-page";
import { OfferPage } from "../../pages/offer-page/offer-page";
import { NotFound } from "../not-found/not-found";
import { PrivateRoute } from '../private-route/private-route';
import { AppRoute } from '../../const';
import type { FullOffer, OffersList } from '../../types/offer';

type AppMainPageProps = {
    rentalOffersCount: number;
    offers: FullOffer[];
    offersList: OffersList[];
    favoriteOffers: OffersList[]; 
}

function App({rentalOffersCount, offers, offersList, favoriteOffers}: AppMainPageProps) {
    return (
        <BrowserRouter>
            <Routes>
                <Route 
                    path={AppRoute.Main} 
                    element={
                        <PrivateRoute>
                            <MainPage />
                        </PrivateRoute>
                    }
                />
                <Route 
                    path={AppRoute.Login} 
                    element={
                        <PrivateRoute>
                            <LoginPage />
                        </PrivateRoute>
                    }
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
                    element={
                        <PrivateRoute>
                            <OfferPage offers={offers}/>
                        </PrivateRoute>
                    }
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